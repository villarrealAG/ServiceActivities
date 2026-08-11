import psutil
import sqlite3
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Valores de porcentaje de uso de CPU, RAM y disco
cpu = psutil.cpu_percent(interval=1)
ram = psutil.virtual_memory().percent
disk = psutil.disk_usage('/').percent

# Impresión de cada porcentaje
print(cpu)
print(ram)
print(disk)