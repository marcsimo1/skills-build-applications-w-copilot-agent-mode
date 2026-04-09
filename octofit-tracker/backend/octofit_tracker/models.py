from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.ForeignKey(Team, related_name='members', on_delete=models.CASCADE)
    is_leader = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    difficulty = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Activity(models.Model):
    user = models.ForeignKey(User, related_name='activities', on_delete=models.CASCADE)
    workout = models.ForeignKey(Workout, related_name='activities', on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    duration_minutes = models.PositiveIntegerField()
    calories_burned = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.user.name} - {self.workout.name} on {self.date}"

class Leaderboard(models.Model):
    team = models.ForeignKey(Team, related_name='leaderboards', on_delete=models.CASCADE)
    total_points = models.PositiveIntegerField(default=0)
    rank = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.team.name} - Rank {self.rank}"
