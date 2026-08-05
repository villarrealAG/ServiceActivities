import pandas as pd

file_path = r"C:\Users\ferx1\OneDrive\Escritorio\Plan_Monitor_Recursos_8_Dias_1_Persona.xlsx"
xl = pd.ExcelFile(file_path)
print("HOJAS:", xl.sheet_names)

for sheet in xl.sheet_names:
    print(f"\n{'='*80}\nHOJA: {sheet}\n{'='*80}")
    df = pd.read_excel(file_path, sheet_name=sheet, header=None)
    print(df.to_string(index=True, header=False))
