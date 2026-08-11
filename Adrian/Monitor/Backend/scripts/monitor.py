import psutil
import time
import json
import subprocess
import platform
import mysql.connector
from mysql.connector import Error

# Intentamos importar la librería para NVIDIA
try:
    import GPUtil
    HAS_GPUTIL = True
except ImportError:
    HAS_GPUTIL = False

# Configuración
EQUIPO_ID = 1
TIEMPO_ESPERA = 2

last_net = psutil.net_io_counters()
last_time = time.time()

def obtener_datos_gpu():
    """Retorna: (uso_gpu, temp_gpu)"""
    # 1. Intentar con GPUtil (Nvidia)
    if HAS_GPUTIL:
        try:
            gpus = GPUtil.getGPUs()
            if gpus:
                gpu = gpus[0]
                return gpu.load * 100, gpu.temperature
        except Exception:
            pass

    # 2. Fallback para Windows (Nvidia/AMD/Intel general usando Performance Counters)
    if platform.system() == "Windows":
        try:
            cmd = ["powershell", "-NoProfile", "-Command", "(((Get-Counter '\\GPU Engine(*engtype_3D)\\Utilization Percentage' -ErrorAction SilentlyContinue).CounterSamples | where CookedValue).CookedValue | measure -sum).sum"]
            resultado = subprocess.run(cmd, capture_output=True, text=True, timeout=3)
            if resultado.returncode == 0:
                salida = resultado.stdout.strip()
                if salida:
                    salida = salida.replace(",", ".")
                    uso_gpu = float(salida)
                    return uso_gpu, 0.0
        except Exception as e:
            print(f"Error al obtener GPU con PowerShell: {e}")
            
    return 0.0, 0.0

def obtener_datos_discos():
    """Retorna: JSON con discos (C:, D:, etc.)"""
    discos = {}
    for particion in psutil.disk_partitions():
        if "cdrom" in particion.opts or particion.fstype == '':
            continue
        try:
            uso = psutil.disk_usage(particion.mountpoint)
            # Se guarda el disco y su porcentaje
            nombre_disco = particion.device.replace('\\','')
            discos[nombre_disco] = uso.percent
        except PermissionError:
            continue
    return json.dumps(discos)

def obtener_datos_red():
    """Retorna: (kbps_bajada, kbps_subida)"""
    global last_net, last_time

    current_net = psutil.net_io_counters()
    current_time = time.time()

    tiempo_transcurrido = current_time - last_time

    bajada_kbps = (current_net.bytes_recv - last_net.bytes_recv) / 1024 / tiempo_transcurrido 
    subida_kbps = (current_net.bytes_sent - last_net.bytes_sent) / 1024 / tiempo_transcurrido 
    
    last_net = current_net
    last_time = current_time

    return bajada_kbps, subida_kbps

def recolectar_e_insertar():
    try:
        # 1. Leer CPU y RAM
        uso_cpu = psutil.cpu_percent(interval=0.5)
        mem = psutil.virtual_memory()
        uso_ram = mem.percent
        # Convertimos los bytes de la RAM a Gigabytes (GB)
        ram_gb = mem.used / (1024 ** 3) 
        
        # 2. Leer GPU, Red y Discos
        uso_gpu, temp_gpu = obtener_datos_gpu()
        red_bajada, red_subida = obtener_datos_red()
        info_discos = obtener_datos_discos()

        # 3. Conexión a Base de Datos
        conexion = mysql.connector.connect(
            host='localhost',
            database='monitor_hw',
            user='root',
            password=''
        )

        if conexion.is_connected():
            cursor = conexion.cursor()
            consulta = """
                INSERT INTO metricas_rendimiento 
                (equipo_id, uso_cpu, uso_ram, ram_gb_usados, uso_gpu, temp_gpu, red_bajada_kbps, red_subida_kbps, info_discos) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            
            # Redondeamos a 2 decimales para que la base de datos esté limpia
            valores = (
                EQUIPO_ID, uso_cpu, uso_ram, round(ram_gb, 2), 
                round(uso_gpu, 2), round(temp_gpu, 2), 
                round(red_bajada, 2), round(red_subida, 2), info_discos
            )
            
            cursor.execute(consulta, valores)
            conexion.commit()
            
            print(f"CPU: {uso_cpu}% | RAM: {round(ram_gb, 2)} GB | GPU: {round(uso_gpu, 2)}% | Red Down: {round(red_bajada, 1)} KB/s")

    except Error as e:
        print(f"Error MySQL: {e}")
    finally:
        if 'conexion' in locals() and conexion.is_connected():
            cursor.close()
            conexion.close()

if __name__ == '__main__':
    print("extrayendo datos reales...")
    while True:
        recolectar_e_insertar()