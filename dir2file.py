import os
import argparse
from pathlib import Path

def collect_project_files(project_path, extensions=None, exclude_dirs=None):
    """
    Рекурсивно собирает файлы проекта с заданными расширениями
    """
    if extensions is None:
        extensions = ['.py', '.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss', '.json', '.yml', '.yaml']
    
    if exclude_dirs is None:
        exclude_dirs = {'.git', '__pycache__', 'node_modules', '.venv', '.idea', 'dist', 'build'}
    
    collected_files = []
    
    for root, dirs, files in os.walk(project_path):
        # Фильтруем директории для исключения
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        
        for file in files:
            file_path = os.path.join(root, file)
            file_ext = os.path.splitext(file)[1].lower()
            
            if file_ext in extensions:
                collected_files.append(file_path)
                
    return collected_files

def create_analysis_file(files, output_path, project_path):
    """
    Создает единый файл с содержимым проекта для анализа нейросетью
    """
    with open(output_path, 'w', encoding='utf-8') as outfile:
        outfile.write(f"=== Проект: {project_path} ===\n")
        outfile.write(f"Всего файлов обработано: {len(files)}\n\n")
        
        for file_path in files:
            try:
                with open(file_path, 'r', encoding='utf-8') as infile:
                    relative_path = os.path.relpath(file_path, project_path)
                    outfile.write(f"\n=== Файл: {relative_path} ===\n")
                    outfile.write(infile.read())
                    outfile.write("\n\n--- КОНЕЦ ФАЙЛА ---\n")
            except Exception as e:
                print(f"Ошибка чтения файла {file_path}: {e}")
    
    return len(files)

def main():
    parser = argparse.ArgumentParser(description='Конвертация проекта в единый файл для анализа')
    parser.add_argument('project_path', type=str, help='Путь к директории проекта')
    parser.add_argument('--output', '-o', type=str, default='project_analysis.txt', 
                        help='Путь к выходному файлу (по умолчанию: project_analysis.txt)')
    parser.add_argument('--extensions', '-e', nargs='+', 
                        help='Список расширений для включения (по умолчанию: python/js/html и др.)')
    parser.add_argument('--exclude', '-x', nargs='+', 
                        help='Директории для исключения (по умолчанию: .git/node_modules и др.)')
    
    args = parser.parse_args()
    
    project_path = os.path.abspath(args.project_path)
    output_path = os.path.abspath(args.output)
    
    if not os.path.isdir(project_path):
        print(f"Ошибка: Директория {project_path} не существует")
        return
    
    print(f"Сбор файлов из {project_path}...")
    
    files = collect_project_files(
        project_path,
        extensions=args.extensions,
        exclude_dirs=set(args.exclude) if args.exclude else None
    )
    
    if not files:
        print("Файлы для обработки не найдены")
        return
    
    print(f"Найдено файлов: {len(files)}")
    print(f"Объединение в {output_path}...")
    
    processed = create_analysis_file(files, output_path, project_path)
    print(f"Успешно обработано {processed} файлов")

if __name__ == '__main__':
    main()