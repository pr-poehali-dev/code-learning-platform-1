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
    { id: 1, title: 'Переменные и типы данных', difficulty: 'Легко', completed: false },
    { id: 2, title: 'Функции и области видимости', difficulty: 'Средне', completed: false },
    { id: 3, title: 'Асинхронность и промисы', difficulty: 'Сложно', completed: false }
  ],
  python: [
    { id: 1, title: 'Основы синтаксиса Python', difficulty: 'Легко', completed: false },
    { id: 2, title: 'Списки и словари', difficulty: 'Средне', completed: false },
    { id: 3, title: 'ООП в Python', difficulty: 'Сложно', completed: false }
  ],
  csharp: [
    { id: 1, title: 'Основы Unity: GameObject и Component', difficulty: 'Легко', completed: false },
    { id: 2, title: 'Создание простой 2D игры', difficulty: 'Средне', completed: false },
    { id: 3, title: 'Физика и коллизии в Unity', difficulty: 'Сложно', completed: false }
  ]
};

const challenges = {
  javascript: {
    1: {
      task: 'Создайте переменную name со значением "Юра" и выведите её в консоль',
      starter: '// Напишите ваш код здесь\n',
      solution: 'const name = "Юра";\nconsole.log(name);'
    }
  },
  python: {
    1: {
      task: 'Создайте переменную greeting и присвойте ей значение "Привет, мир!"',
      starter: '# Напишите ваш код здесь\n',
      solution: 'greeting = "Привет, мир!"\nprint(greeting)'
    }
  },
  csharp: {
    1: {
      task: 'Создайте класс Player с публичным полем playerName',
      starter: '// Напишите ваш код здесь\n',
      solution: 'public class Player\n{\n    public string playerName;\n}'
    }
  }
};

export default function Index() {
  const [currentView, setCurrentView] = useState<'home' | 'languages' | 'editor' | 'courses' | 'auth'>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('javascript');
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [code, setCode] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userProgress, setUserProgress] = useState(0);

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
              <p className="text-lg text-muted-foreground">
                {challenges[selectedLanguage as keyof typeof challenges]?.[selectedCourse!]?.task}
              </p>
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
