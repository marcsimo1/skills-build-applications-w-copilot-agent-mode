from django.test import TestCase
from .models import User, Team, Workout, Activity, Leaderboard

class ModelTests(TestCase):
    def setUp(self):
        team = Team.objects.create(name="Marvel", description="Marvel Team")
        user = User.objects.create(name="Iron Man", email="ironman@marvel.com", team=team, is_leader=True)
        workout = Workout.objects.create(name="Pushups", description="Upper body workout", difficulty="Easy")
        activity = Activity.objects.create(user=user, workout=workout, duration_minutes=30, calories_burned=200)
        Leaderboard.objects.create(team=team, total_points=100, rank=1)

    def test_user(self):
        self.assertEqual(User.objects.count(), 1)

    def test_team(self):
        self.assertEqual(Team.objects.count(), 1)

    def test_workout(self):
        self.assertEqual(Workout.objects.count(), 1)

    def test_activity(self):
        self.assertEqual(Activity.objects.count(), 1)

    def test_leaderboard(self):
        self.assertEqual(Leaderboard.objects.count(), 1)
