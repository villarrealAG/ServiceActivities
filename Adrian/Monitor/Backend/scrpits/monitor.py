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
TIEMPO_ESPERA = 5

def obtener_datos_gpu():
    """Retorna: (uso_gpu, temp_gpu)"""
    # TODO: Día 2 - Lógica AMD/Intel/NVIDIA
    return 0.0, 0.0

def obtener_datos_discos():
    """Retorna: JSON con discos (C:, D:, etc.)"""
    # TODO: Día 2 - Lógica de lectura de particiones
    return json.dumps({})

def obtener_datos_red():
    """Retorna: (kbps_bajada, kbps_subida)"""
    # TODO: Día 2 - Lógica de red
    return 0.0, 0.0

def recolectar_e_insertar():
    try:
        # TODO: Día 2 - Leer CPU, RAM (porcentaje y GB)
        uso_cpu = 0.0
        uso_ram = 0.0
        ram_gb = 0.0
        
        uso_gpu, temp_gpu = obtener_datos_gpu()
        red_bajada, red_subida = obtener_datos_red()
        info_discos = obtener_datos_discos()

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
            valores = (EQUIPO_ID, uso_cpu, uso_ram, ram_gb, uso_gpu, temp_gpu, red_bajada, red_subida, info_discos)
            
            cursor.execute(consulta, valores)
            conexion.commit()
            print("[OK] Datos de hardware registrados correctamente.")

    except Error as e:
        print(f"[ERROR] Error MySQL: {e}")
    finally:
        if 'conexion' in locals() and conexion.is_connected():
            cursor.close()
            conexion.close()

if __name__ == '__main__':
    print("[INFO] Super Monitor iniciando (Esperando codigo del Dia 2)...")
    # while True:
    #     recolectar_e_insertar()
    #     time.sleep(TIEMPO_ESPERA)