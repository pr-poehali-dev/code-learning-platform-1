import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const languages = [
  { id: 'javascript', name: 'JavaScript', icon: '🟨', color: 'from-yellow-500 to-orange-500' },
  { id: 'python', name: 'Python', icon: '🐍', color: 'from-blue-500 to-cyan-500' },
  { id: 'java', name: 'Java', icon: '☕', color: 'from-red-500 to-orange-600' },
  { id: 'cpp', name: 'C++', icon: '⚡', color: 'from-indigo-500 to-purple-500' },
  { id: 'csharp', name: 'Unity C#', icon: '🎮', color: 'from-purple-500 to-pink-500' }
];

const courses = {
  javascript: [
    { id: 1, title: 'Первая программа Hello World', difficulty: 'Легко', completed: false },
    { id: 2, title: 'Калькулятор на JavaScript', difficulty: 'Средне', completed: false },
    { id: 3, title: 'Игра Кликер', difficulty: 'Средне', completed: false },
    { id: 4, title: 'Генератор случайных чисел', difficulty: 'Сложно', completed: false }
  ],
  python: [
    { id: 1, title: 'Приветствие пользователя', difficulty: 'Легко', completed: false },
    { id: 2, title: 'Калькулятор на Python', difficulty: 'Средне', completed: false },
    { id: 3, title: 'Игра "Угадай число"', difficulty: 'Средне', completed: false },
    { id: 4, title: 'Список задач (ToDo)', difficulty: 'Сложно', completed: false }
  ],
  csharp: [
    { id: 1, title: 'Создание GameObject в Unity', difficulty: 'Легко', completed: false },
    { id: 2, title: 'Движение персонажа', difficulty: 'Средне', completed: false },
    { id: 3, title: 'Игра Кликер в Unity', difficulty: 'Средне', completed: false },
    { id: 4, title: 'Система здоровья игрока', difficulty: 'Сложно', completed: false }
  ],
  java: [
    { id: 1, title: 'Hello World на Java', difficulty: 'Легко', completed: false },
    { id: 2, title: 'Работа с массивами', difficulty: 'Средне', completed: false },
    { id: 3, title: 'Простой банкомат', difficulty: 'Сложно', completed: false }
  ],
  cpp: [
    { id: 1, title: 'Первая программа на C++', difficulty: 'Легко', completed: false },
    { id: 2, title: 'Циклы и условия', difficulty: 'Средне', completed: false },
    { id: 3, title: 'Консольная игра', difficulty: 'Сложно', completed: false }
  ]
};

const challenges = {
  javascript: {
    1: {
      task: 'Создайте переменную message со значением "Hello World" и выведите её в консоль',
      starter: '// Напишите ваш код здесь\n',
      solution: 'const message = "Hello World";\nconsole.log(message);',
      hint: 'Используй const для создания переменной, затем console.log() для вывода'
    },
    2: {
      task: 'Создайте функцию calculator, которая принимает два числа и возвращает их сумму',
      starter: '// Создай функцию calculator\nfunction calculator(a, b) {\n  // твой код здесь\n}\n\nconsole.log(calculator(5, 3));',
      solution: 'function calculator(a, b) {\n  return a + b;\n}\n\nconsole.log(calculator(5, 3));',
      hint: 'Используй return для возврата результата сложения a + b'
    },
    3: {
      task: 'Создайте игру-кликер: переменная score = 0, функция click() увеличивает score на 1',
      starter: '// Создай переменную score\nlet score = 0;\n\n// Создай функцию click\nfunction click() {\n  // твой код здесь\n}\n\nclick();\nclick();\nconsole.log(score);',
      solution: 'let score = 0;\n\nfunction click() {\n  score = score + 1;\n}\n\nclick();\nclick();\nconsole.log(score);',
      hint: 'Используй score = score + 1 или score++ для увеличения счётчика'
    },
    4: {
      task: 'Создайте генератор случайных чисел от 1 до 100',
      starter: '// Создай функцию randomNumber\nfunction randomNumber() {\n  // используй Math.random() и Math.floor()\n}\n\nconsole.log(randomNumber());',
      solution: 'function randomNumber() {\n  return Math.floor(Math.random() * 100) + 1;\n}\n\nconsole.log(randomNumber());',
      hint: 'Math.random() даёт число от 0 до 1, умножь на 100 и используй Math.floor()'
    }
  },
  python: {
    1: {
      task: 'Запросите имя пользователя и поприветствуйте его',
      starter: '# Получи имя от пользователя\nname = input("Как тебя зовут? ")\n# Выведи приветствие\n',
      solution: 'name = input("Как тебя зовут? ")\nprint(f"Привет, {name}!");',
      hint: 'Используй f-строку: f"Привет, {name}!" для вывода'
    },
    2: {
      task: 'Создайте калькулятор, который складывает два числа',
      starter: '# Получи два числа\na = int(input("Первое число: "))\nb = int(input("Второе число: "))\n# Посчитай сумму и выведи результат\n',
      solution: 'a = int(input("Первое число: "))\nb = int(input("Второе число: "))\nresult = a + b\nprint(f"Сумма: {result}");',
      hint: 'Создай переменную result = a + b и выведи её'
    },
    3: {
      task: 'Создайте игру "Угадай число": программа загадывает число от 1 до 10',
      starter: 'import random\n\n# Загадай число\nsecret = random.randint(1, 10)\n# Получи попытку от игрока\nguess = int(input("Угадай число от 1 до 10: "))\n# Проверь и выведи результат\n',
      solution: 'import random\n\nsecret = random.randint(1, 10)\nguess = int(input("Угадай число от 1 до 10: "))\nif guess == secret:\n    print("Угадал!")\nelse:\n    print(f"Не угадал, было {secret}");',
      hint: 'Используй if guess == secret для проверки'
    },
    4: {
      task: 'Создайте список задач: добавление задачи в массив и вывод всех задач',
      starter: '# Создай пустой список\ntasks = []\n# Добавь задачу\ntask = input("Введи задачу: ")\n# твой код здесь\n# Выведи все задачи\n',
      solution: 'tasks = []\ntask = input("Введи задачу: ")\ntasks.append(task)\nfor t in tasks:\n    print(f"- {t}");',
      hint: 'Используй tasks.append(task) для добавления, цикл for для вывода'
    }
  },
  csharp: {
    1: {
      task: 'Создайте GameObject с именем "Player" в Unity',
      starter: '// Создай новый GameObject\nGameObject player = new GameObject();\n// Задай ему имя\n',
      solution: 'GameObject player = new GameObject();\nplayer.name = "Player";',
      hint: 'Используй player.name = "Player" чтобы назвать объект'
    },
    2: {
      task: 'Добавьте движение персонажу: при Update() двигай его вправо',
      starter: 'void Update() {\n    // Двигай transform вправо на 0.1 единицу\n    // Используй transform.Translate\n}',
      solution: 'void Update() {\n    transform.Translate(0.1f, 0, 0);\n}',
      hint: 'transform.Translate(x, y, z) двигает объект. Для вправо используй (0.1f, 0, 0)'
    },
    3: {
      task: 'Создайте кликер: переменная score, метод OnClick() увеличивает счёт',
      starter: 'int score = 0;\n\nvoid OnClick() {\n    // Увеличь score на 1\n    // Выведи в консоль\n}',
      solution: 'int score = 0;\n\nvoid OnClick() {\n    score++;\n    Debug.Log("Score: " + score);\n}',
      hint: 'Используй score++ для увеличения и Debug.Log() для вывода'
    },
    4: {
      task: 'Создайте систему здоровья: переменная health = 100, метод TakeDamage(int damage)',
      starter: 'int health = 100;\n\nvoid TakeDamage(int damage) {\n    // Уменьши health на damage\n    // Проверь, если health <= 0, выведи "Game Over"\n}',
      solution: 'int health = 100;\n\nvoid TakeDamage(int damage) {\n    health -= damage;\n    if (health <= 0) {\n        Debug.Log("Game Over");\n    }\n}',
      hint: 'Используй health -= damage для уменьшения, if (health <= 0) для проверки'
    }
  },
  java: {
    1: {
      task: 'Создайте программу Hello World на Java',
      starter: 'public class Main {\n    public static void main(String[] args) {\n        // Выведи "Hello World"\n    }\n}',
      solution: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}',
      hint: 'Используй System.out.println() для вывода'
    },
    2: {
      task: 'Создайте массив из 5 чисел и выведите первый элемент',
      starter: 'int[] numbers = {10, 20, 30, 40, 50};\n// Выведи первый элемент\n',
      solution: 'int[] numbers = {10, 20, 30, 40, 50};\nSystem.out.println(numbers[0]);',
      hint: 'Первый элемент массива - numbers[0]'
    },
    3: {
      task: 'Создайте банкомат: баланс 1000, метод withdraw(int amount) снимает деньги',
      starter: 'int balance = 1000;\n\nvoid withdraw(int amount) {\n    // Проверь, хватает ли денег\n    // Если да - уменьши баланс\n    // Если нет - выведи ошибку\n}',
      solution: 'int balance = 1000;\n\nvoid withdraw(int amount) {\n    if (amount <= balance) {\n        balance -= amount;\n        System.out.println("Выдано: " + amount);\n    } else {\n        System.out.println("Недостаточно средств");\n    }\n}',
      hint: 'Сначала проверь if (amount <= balance), потом вычти'
    }
  },
  cpp: {
    1: {
      task: 'Создайте первую программу на C++',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Выведи "Hello C++"\n    return 0;\n}',
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello C++" << endl;\n    return 0;\n}',
      hint: 'Используй cout << "текст" << endl;'
    },
    2: {
      task: 'Создайте цикл, который выводит числа от 1 до 5',
      starter: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Создай цикл for от 1 до 5\n    return 0;\n}',
      solution: '#include <iostream>\nusing namespace std;\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        cout << i << endl;\n    }\n    return 0;\n}',
      hint: 'Используй for (int i = 1; i <= 5; i++)'
    },
    3: {
      task: 'Создайте консольную игру "Орёл или решка"',
      starter: '#include <iostream>\n#include <cstdlib>\nusing namespace std;\n\nint main() {\n    // Сгенерируй случайное число 0 или 1\n    // Если 0 - "Орёл", если 1 - "Решка"\n    return 0;\n}',
      solution: '#include <iostream>\n#include <cstdlib>\nusing namespace std;\n\nint main() {\n    int coin = rand() % 2;\n    if (coin == 0) {\n        cout << "Орёл" << endl;\n    } else {\n        cout << "Решка" << endl;\n    }\n    return 0;\n}',
      hint: 'rand() % 2 даёт 0 или 1, используй if для проверки'
    }
  }
};

const handbook = {
  javascript: [
    {
      title: 'Переменные',
      content: 'В JavaScript есть три способа объявления переменных: var, let и const. Используй const для неизменяемых значений, let для изменяемых.',
      examples: [
        { code: 'const name = "Юра";', desc: 'Константа - нельзя изменить' },
        { code: 'let age = 25;', desc: 'Переменная - можно изменить' },
        { code: 'var oldWay = "устаревший способ";', desc: 'Старый способ - не используй' }
      ]
    },
    {
      title: 'Типы данных',
      content: 'JavaScript поддерживает различные типы данных: строки (string), числа (number), булевы значения (boolean), объекты (object), массивы (array).',
      examples: [
        { code: 'const text = "Привет";', desc: 'Строка' },
        { code: 'const num = 42;', desc: 'Число' },
        { code: 'const isActive = true;', desc: 'Булево значение' },
        { code: 'const user = {name: "Юра", age: 25};', desc: 'Объект' },
        { code: 'const colors = ["red", "green", "blue"];', desc: 'Массив' }
      ]
    },
    {
      title: 'Функции',
      content: 'Функции - это блоки кода, которые можно вызывать многократно. Создавай их с помощью function или стрелочных функций =>.',
      examples: [
        { code: 'function greet() { console.log("Привет!"); }', desc: 'Обычная функция' },
        { code: 'const sum = (a, b) => a + b;', desc: 'Стрелочная функция' },
        { code: 'function multiply(x, y) { return x * y; }', desc: 'Функция с возвратом' }
      ]
    },
    {
      title: 'Условия',
      content: 'Используй if/else для проверки условий. Тернарный оператор ? : для коротких проверок.',
      examples: [
        { code: 'if (age > 18) { console.log("Взрослый"); }', desc: 'Простое условие' },
        { code: 'const status = age > 18 ? "Взрослый" : "Ребёнок";', desc: 'Тернарный оператор' }
      ]
    },
    {
      title: 'Циклы',
      content: 'Циклы позволяют повторять код. Используй for для счётчика, while для условия.',
      examples: [
        { code: 'for (let i = 0; i < 5; i++) { console.log(i); }', desc: 'Цикл for' },
        { code: 'colors.forEach(c => console.log(c));', desc: 'Перебор массива' }
      ]
    },
    {
      title: 'Создание игры-кликера',
      content: 'Кликер - это игра где клик увеличивает счёт. Нужна переменная для счёта и функция для клика.',
      examples: [
        { code: 'let score = 0;\nfunction click() { score++; }', desc: 'Базовая логика' },
        { code: 'let scorePerClick = 1;\nscore += scorePerClick;', desc: 'Улучшения' },
        { code: 'setInterval(() => { score += autoClicks; }, 1000);', desc: 'Автоклики' }
      ]
    }
  ],
  python: [
    {
      title: 'Переменные',
      content: 'В Python переменные создаются просто через присваивание. Не нужно указывать тип - Python определит его автоматически.',
      examples: [
        { code: 'name = "Юра"', desc: 'Строковая переменная' },
        { code: 'age = 25', desc: 'Числовая переменная' },
        { code: 'is_student = True', desc: 'Булева переменная' }
      ]
    },
    {
      title: 'Типы данных',
      content: 'Python имеет встроенные типы: str (строки), int (целые числа), float (дробные), bool (булевы), list (списки), dict (словари).',
      examples: [
        { code: 'numbers = [1, 2, 3]', desc: 'Список' },
        { code: 'person = {"name": "Юра"}', desc: 'Словарь' }
      ]
    },
    {
      title: 'Функции',
      content: 'Функции в Python создаются с помощью ключевого слова def. Обрати внимание на отступы - они обязательны!',
      examples: [
        { code: 'def greet():\n    print("Привет!")', desc: 'Простая функция' },
        { code: 'def add(a, b):\n    return a + b', desc: 'Функция с параметрами' }
      ]
    }
  ],
  csharp: [
    {
      title: 'GameObject и Component',
      content: 'В Unity всё построено на GameObject - это базовый объект сцены. К нему прикрепляются компоненты (Components), которые добавляют функциональность.',
      examples: [
        { code: 'GameObject player = new GameObject("Player");', desc: 'Создание объекта' },
        { code: 'player.AddComponent<Rigidbody2D>();', desc: 'Добавление физики' }
      ]
    },
    {
      title: 'Переменные и типы',
      content: 'C# - строго типизированный язык. Нужно указывать тип переменной: int (целые), float (дробные), string (строки), bool (булевы).',
      examples: [
        { code: 'int health = 100;', desc: 'Целое число' },
        { code: 'float speed = 5.5f;', desc: 'Дробное число' },
        { code: 'string playerName = "Герой";', desc: 'Строка' }
      ]
    },
    {
      title: 'Методы (функции)',
      content: 'В Unity используются специальные методы: Start() вызывается при создании объекта, Update() - каждый кадр.',
      examples: [
        { code: 'void Start() {\n    Debug.Log("Игра началась!");\n}', desc: 'Метод при старте' },
        { code: 'void Update() {\n    transform.Rotate(0, 0, 1);\n}', desc: 'Каждый кадр' }
      ]
    },
    {
      title: 'Гайд: Игра-кликер в Unity',
      content: 'Для создания кликера: 1) Создай переменную score 2) Добавь метод OnClick() 3) Привяжи к Button 4) Отображай через UI Text',
      examples: [
        { code: 'int score = 0;\nvoid OnClick() {\n    score++;\n}', desc: 'Базовая логика' },
        { code: 'public Text scoreText;\nscoreText.text = score.ToString();', desc: 'Отображение UI' },
        { code: 'int scorePerClick = 1;\nscore += scorePerClick;', desc: 'Улучшения' }
      ]
    }
  ]
};

export default function Index() {
  const [currentView, setCurrentView] = useState<'home' | 'languages' | 'editor' | 'courses' | 'auth' | 'handbook'>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('javascript');
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [code, setCode] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userProgress, setUserProgress] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const handleLanguageSelect = (langId: string) => {
    setSelectedLanguage(langId);
    setCurrentView('courses');
  };

  const handleCourseSelect = (courseId: number) => {
    setSelectedCourse(courseId);
    const challenge = challenges[selectedLanguage as keyof typeof challenges]?.[courseId];
    if (challenge) {
      setCode(challenge.starter);
    }
    setCurrentView('editor');
  };

  const checkCode = () => {
    const challenge = challenges[selectedLanguage as keyof typeof challenges]?.[selectedCourse!];
    if (!challenge) return;

    const normalizedCode = code.trim().replace(/\s+/g, ' ');
    const normalizedSolution = challenge.solution.trim().replace(/\s+/g, ' ');

    if (normalizedCode === normalizedSolution) {
      toast.success('Отлично! Код верный! 🎉', {
        description: 'Вы успешно выполнили задание'
      });
      setUserProgress(prev => Math.min(prev + 15, 100));
    } else {
      toast.error('Код содержит ошибки', {
        description: 'Попробуйте ещё раз или проверьте синтаксис'
      });
    }
  };

  const handleAuth = () => {
    if (username && password) {
      setIsAuthenticated(true);
      setCurrentView('home');
      toast.success(`Добро пожаловать, ${username}!`);
    } else {
      toast.error('Заполните все поля');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none" />
      <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

      <nav className="relative z-10 glass border-b border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-2xl">
              🚀
            </div>
            <h1 className="text-2xl font-bold text-gradient">CodeMaster</h1>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setCurrentView('home')}
              className="hover:bg-white/5"
            >
              <Icon name="Home" className="mr-2" size={18} />
              Главная
            </Button>
            <Button
              variant="ghost"
              onClick={() => setCurrentView('languages')}
              className="hover:bg-white/5"
            >
              <Icon name="Code" className="mr-2" size={18} />
              Языки
            </Button>
            {isAuthenticated ? (
              <Button
                variant="ghost"
                className="hover:bg-white/5"
              >
                <Icon name="User" className="mr-2" size={18} />
                {username}
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentView('auth')}
                className="gradient-primary hover:opacity-90"
              >
                <Icon name="LogIn" className="mr-2" size={18} />
                Войти
              </Button>
            )}
          </div>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto px-6 py-12">
        {currentView === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <div className="text-center space-y-6 py-20">
              <h2 className="text-6xl font-bold text-gradient leading-tight">
                Научись программировать<br />с интерактивной проверкой
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Выбирай язык программирования, пиши код и получай мгновенную обратную связь
              </p>
              <div className="flex gap-4 justify-center pt-6">
                <Button
                  size="lg"
                  onClick={() => setCurrentView('languages')}
                  className="gradient-primary text-lg px-8 py-6 hover:scale-105 transition-transform glow"
                >
                  <Icon name="Rocket" className="mr-2" size={24} />
                  Начать обучение
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10"
                >
                  <Icon name="PlayCircle" className="mr-2" size={24} />
                  Смотреть демо
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: 'Code2', title: 'Интерактивный редактор', desc: 'Пиши код прямо в браузере с подсветкой синтаксиса' },
                { icon: 'CheckCircle2', title: 'Автопроверка', desc: 'Мгновенная проверка правильности твоего кода' },
                { icon: 'Trophy', title: 'Трек прогресса', desc: 'Отслеживай свои достижения и развивайся' }
              ].map((feature, i) => (
                <Card key={i} className="p-6 glass hover:bg-white/10 transition-all hover:scale-105 animate-scale-in border-white/10">
                  <div className="w-14 h-14 rounded-xl gradient-accent flex items-center justify-center mb-4">
                    <Icon name={feature.icon as any} size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </Card>
              ))}
            </div>

            {isAuthenticated && (
              <Card className="p-8 glass border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">Твой прогресс</h3>
                  <Badge className="gradient-primary text-lg px-4 py-2">{userProgress}%</Badge>
                </div>
                <Progress value={userProgress} className="h-3" />
              </Card>
            )}
          </div>
        )}

        {currentView === 'languages' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold text-gradient">Выбери язык программирования</h2>
              <p className="text-xl text-muted-foreground">Начни своё путешествие в мир кода</p>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 pt-8">
              {languages.map((lang, i) => (
                <Card
                  key={lang.id}
                  onClick={() => handleLanguageSelect(lang.id)}
                  className="p-8 glass border-white/10 hover:bg-white/10 cursor-pointer transition-all hover:scale-110 hover:rotate-2 group"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="text-center space-y-4">
                    <div className={`text-6xl mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br ${lang.color} flex items-center justify-center group-hover:animate-pulse-glow`}>
                      {lang.icon}
                    </div>
                    <h3 className="text-xl font-bold">{lang.name}</h3>
                    <Button className="w-full gradient-primary hover:opacity-90">
                      Начать
                      <Icon name="ArrowRight" className="ml-2" size={18} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentView === 'courses' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setCurrentView('languages')}>
                <Icon name="ArrowLeft" className="mr-2" size={18} />
                Назад
              </Button>
              <h2 className="text-4xl font-bold text-gradient">
                Курсы по {languages.find(l => l.id === selectedLanguage)?.name}
              </h2>
            </div>

            <Card 
              onClick={() => setCurrentView('handbook')}
              className="p-6 glass border-primary/30 hover:bg-white/10 cursor-pointer transition-all hover:scale-[1.02] group mb-6"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl gradient-accent flex items-center justify-center text-4xl group-hover:animate-pulse-glow">
                  📚
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    Справочник по {languages.find(l => l.id === selectedLanguage)?.name}
                    <Badge className="gradient-primary">Теория</Badge>
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    Изучи основы: переменные, типы данных, функции и многое другое
                  </p>
                </div>
                <Icon name="ChevronRight" className="text-primary" size={32} />
              </div>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(courses[selectedLanguage as keyof typeof courses] || []).map((course) => (
                <Card
                  key={course.id}
                  onClick={() => handleCourseSelect(course.id)}
                  className="p-6 glass border-white/10 hover:bg-white/10 cursor-pointer transition-all hover:scale-105 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant={course.difficulty === 'Легко' ? 'default' : course.difficulty === 'Средне' ? 'secondary' : 'destructive'}>
                      {course.difficulty}
                    </Badge>
                    <Icon name="BookOpen" className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                  <Button className="w-full gradient-primary hover:opacity-90 group-hover:scale-105 transition-transform">
                    Открыть урок
                    <Icon name="Play" className="ml-2" size={18} />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentView === 'handbook' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setCurrentView('courses')}>
                <Icon name="ArrowLeft" className="mr-2" size={18} />
                К курсам
              </Button>
              <h2 className="text-4xl font-bold text-gradient flex items-center gap-3">
                📚 Справочник: {languages.find(l => l.id === selectedLanguage)?.name}
              </h2>
            </div>

            <div className="space-y-6">
              {(handbook[selectedLanguage as keyof typeof handbook] || []).map((section, idx) => (
                <Card key={idx} className="p-8 glass border-white/10 hover:border-primary/30 transition-all">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-2xl font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-3">{section.title}</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">{section.content}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mt-6 pt-6 border-t border-white/10">
                    <h4 className="text-xl font-bold flex items-center gap-2">
                      <Icon name="Code" className="text-accent" size={20} />
                      Примеры кода
                    </h4>
                    {section.examples.map((example, exIdx) => (
                      <div key={exIdx} className="bg-black/30 rounded-lg p-4 border border-white/5">
                        <code className="text-accent text-base font-mono block mb-2 whitespace-pre-wrap">
                          {example.code}
                        </code>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Icon name="Info" size={14} />
                          {example.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {currentView === 'editor' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => setCurrentView('courses')}>
                  <Icon name="ArrowLeft" className="mr-2" size={18} />
                  К курсам
                </Button>
                <Badge className="gradient-primary text-lg px-4 py-2">
                  {languages.find(l => l.id === selectedLanguage)?.name}
                </Badge>
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowHint(!showHint)} 
                  variant="outline" 
                  className="border-warning/50 hover:bg-warning/10"
                >
                  <Icon name="Lightbulb" className="mr-2" size={18} />
                  Подсказка
                </Button>
                <Button onClick={checkCode} className="gradient-accent hover:opacity-90 glow">
                  <Icon name="Play" className="mr-2" size={18} />
                  Проверить код
                </Button>
              </div>
            </div>

            <Card className="p-6 glass border-white/10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Target" className="text-primary" size={24} />
                Задание
              </h3>
              <p className="text-lg text-muted-foreground mb-4">
                {challenges[selectedLanguage as keyof typeof challenges]?.[selectedCourse!]?.task}
              </p>
              
              {showHint && (
                <div className="mt-4 p-4 bg-warning/10 border border-warning/30 rounded-lg animate-scale-in">
                  <div className="flex items-start gap-3">
                    <Icon name="Lightbulb" className="text-warning mt-1" size={20} />
                    <div>
                      <p className="font-semibold text-warning mb-1">Подсказка:</p>
                      <p className="text-sm text-foreground/80">
                        {challenges[selectedLanguage as keyof typeof challenges]?.[selectedCourse!]?.hint}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-6 glass border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Icon name="Code2" className="text-accent" size={24} />
                  Редактор кода
                </h3>
                <Badge variant="outline" className="border-accent/50">Режим редактирования</Badge>
              </div>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="min-h-[400px] font-mono text-base bg-black/50 border-white/10 focus:border-primary resize-none"
                placeholder="Напишите ваш код здесь..."
              />
            </Card>
          </div>
        )}

        {currentView === 'auth' && (
          <div className="max-w-md mx-auto animate-scale-in">
            <Card className="p-8 glass border-white/10 glow">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-4xl mx-auto mb-4">
                  🚀
                </div>
                <h2 className="text-3xl font-bold text-gradient mb-2">
                  {authMode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}
                </h2>
                <p className="text-muted-foreground">
                  {authMode === 'login' ? 'Продолжи своё обучение' : 'Создай аккаунт для сохранения прогресса'}
                </p>
              </div>

              <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as 'login' | 'register')} className="mb-6">
                <TabsList className="grid w-full grid-cols-2 bg-black/30">
                  <TabsTrigger value="login">Вход</TabsTrigger>
                  <TabsTrigger value="register">Регистрация</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Имя пользователя</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-black/30 border-white/10"
                    placeholder="Введите имя"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-black/30 border-white/10"
                    placeholder="Введите пароль"
                  />
                </div>
                <Button onClick={handleAuth} className="w-full gradient-primary text-lg py-6 hover:opacity-90">
                  {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="relative z-10 border-t border-white/10 mt-20 glass">
        <div className="container mx-auto px-6 py-8 text-center text-muted-foreground">
          <p>© 2024 CodeMaster. Учись программировать с удовольствием 🚀</p>
        </div>
      </footer>
    </div>
  );
}