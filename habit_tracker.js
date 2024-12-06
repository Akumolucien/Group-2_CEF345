class HabitTracker {
    constructor() {
        // DOM Element Selectors
        this.habitForm = document.getElementById('habit-form');
        this.habitNameInput = document.getElementById('habit-name');
        this.habitFrequencySelect = document.getElementById('habit-frequency');
        this.habitsContainer = document.getElementById('habits-container');
        this.totalHabitsOutput = document.getElementById('total-habits');
        this.completedHabitsOutput = document.getElementById('completed-habits');
        this.completionRateOutput = document.getElementById('completion-rate');
        this.longestStreakOutput = document.getElementById('longest-streak');

        // Data Storage
        this.habits = JSON.parse(localStorage.getItem('habits')) || [];

        // Event Listeners
        this.habitForm.addEventListener('submit', this.addHabit.bind(this));
        
        // Initial Render
        this.renderHabits();
        this.updateStats();
    }

    addHabit(event) {
        event.preventDefault();

        const habitName = this.habitNameInput.value.trim();
        const habitFrequency = this.habitFrequencySelect.value;

        if (!habitName) return;

        const newHabit = {
            id: Date.now(),
            name: habitName,
            frequency: habitFrequency,
            createdDate: new Date().toISOString(),
            completions: [],
            streak: 0
        };

        this.habits.push(newHabit);
        this.saveHabits();
        this.renderHabits();
        this.updateStats();

        // Reset form
        this.habitNameInput.value = '';
    }

    renderHabits() {
        this.habitsContainer.innerHTML = '';

        this.habits.forEach(habit => {
            const habitElement = document.createElement('section');
            habitElement.classList.add('habit-item');
            habitElement.innerHTML = `
                <h3>${habit.name}</h3>
                <p>Frequency: ${habit.frequency}</p>
                <button onclick="habitTracker.toggleHabitCompletion(${habit.id})">
                    Complete
                </button>
                <button onclick="habitTracker.deleteHabit(${habit.id})">
                    Delete
                </button>
                <span>Current Streak: ${habit.streak} days</span>
            `;
            this.habitsContainer.appendChild(habitElement);
        });
    }

    toggleHabitCompletion(habitId) {
        const habit = this.habits.find(h => h.id === habitId);
        const today = new Date().toISOString().split('T')[0];

        // Check if already completed today
        if (habit.completions.includes(today)) {
            alert('You have already completed this habit today!');
            return;
        }

        habit.completions.push(today);
        this.calculateStreak(habit);
        this.saveHabits();
        this.renderHabits();
        this.updateStats();
    }

    calculateStreak(habit) {
        const completionDates = habit.completions
            .map(date => new Date(date))
            .sort((a, b) => a - b);

        let currentStreak = 0;
        let lastDate = null;

        for (let date of completionDates) {
            const isConsecutive = lastDate 
                ? this.isConsecutiveDay(lastDate, date)
                : true;

            if (isConsecutive) {
                currentStreak++;
            } else {
                currentStreak = 1;
            }

            lastDate = date;
        }

        habit.streak = currentStreak;
    }

    isConsecutiveDay(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000;
        return (date2 - date1 === oneDay);
    }

    deleteHabit(habitId) {
        this.habits = this.habits.filter(habit => habit.id !== habitId);
        this.saveHabits();
        this.renderHabits();
        this.updateStats();
    }

    updateStats() {
        const totalHabits = this.habits.length;
        const completedHabits = this.habits.filter(habit => 
            habit.completions.includes(new Date().toISOString().split('T')[0])
        ).length;

        const completionRate = totalHabits > 0 
            ? Math.round((completedHabits / totalHabits) * 100)
            : 0;

        const longestStreak = Math.max(
            ...this.habits.map(habit => habit.streak), 0
        );

        this.totalHabitsOutput.textContent = `Total Habits: ${totalHabits}`;
        this.completedHabitsOutput.textContent = `Completed: ${completedHabits}`;
        this.completionRateOutput.textContent = `${completionRate}%`;
        this.longestStreakOutput.textContent = `${longestStreak} days`;
    }

    saveHabits() {
        localStorage.setItem('habits', JSON.stringify(this.habits));
    }
}

// Initialize the Habit Tracker
const habitTracker = new HabitTracker();