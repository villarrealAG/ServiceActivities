#!/usr/bin/env python3
"""
monitor.py — Recolector de métricas del sistema
Sistema Monitor de Recursos - Día 1

Uso:
    python monitor.py --host-id=1
    python monitor.py --host-id=2

Salida: JSON con host_id, cpu, ram, disk, timestamp
"""

import argparse
import json
import sys
from datetime import datetime, timezone

try:
    import psutil
except ImportError:
    print(json.dumps({
        "error": "psutil no está instalado. Ejecuta: pip install -r requirements.txt"
    }))
    sys.exit(1)


def get_metrics(host_id: int) -> dict:
    """
    Lee métricas actuales del sistema usando psutil.
    Compatible con Windows, Linux y macOS.
    """

    # ── CPU ──────────────────────────────────────────────────────
    # interval=1 hace una lectura bloqueante de 1 segundo (más precisa)
    cpu_percent = psutil.cpu_percent(interval=1)

    # ── RAM ──────────────────────────────────────────────────────
    virtual_mem = psutil.virtual_memory()
    ram_percent = virtual_mem.percent

    # ── Disco ────────────────────────────────────────────────────
    # En Windows la raíz es "C:\", en Linux/macOS es "/"
    disk_root = "C:\\" if sys.platform == "win32" else "/"
    disk_usage = psutil.disk_usage(disk_root)
    disk_percent = disk_usage.percent

    # ── Timestamp ISO 8601 (UTC) ─────────────────────────────────
    timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")

    return {
        "host_id":      host_id,
        "cpu":          round(cpu_percent, 2),
        "ram":          round(ram_percent, 2),
        "disk":         round(disk_percent, 2),
        "timestamp":    timestamp
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Recolecta métricas de CPU, RAM y Disco del sistema local."
    )
    parser.add_argument(
        "--host-id",
        type=int,
        required=True,
        help="ID del host en la base de datos (ej. --host-id=1)"
    )
    return parser.parse_args()


def main():
    args = parse_args()

    if args.host_id <= 0:
        print(json.dumps({
            "error": "host-id debe ser un entero positivo"
        }))
        sys.exit(1)

    try:
        metrics = get_metrics(args.host_id)
        # Salida JSON limpia, una sola línea (fácil de parsear desde PHP)
        print(json.dumps(metrics))

    except psutil.AccessDenied as e:
        print(json.dumps({
            "error":   "Permiso denegado al leer métricas",
            "detail":  str(e),
            "host_id": args.host_id
        }))
        sys.exit(1)

    except Exception as e:
        print(json.dumps({
            "error":   "Error inesperado al obtener métricas",
            "detail":  str(e),
            "host_id": args.host_id
        }))
        sys.exit(1)


if __name__ == "__main__":
    main()
