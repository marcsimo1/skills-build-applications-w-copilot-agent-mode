from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Workout, Activity, Leaderboard

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        # Create Teams
        marvel = Team.objects.create(name='Marvel', description='Marvel Superheroes')
        dc = Team.objects.create(name='DC', description='DC Superheroes')

        # Create Workouts
        pushups = Workout.objects.create(name='Pushups', description='Upper body workout', difficulty='Easy')
        running = Workout.objects.create(name='Running', description='Cardio workout', difficulty='Medium')
        squats = Workout.objects.create(name='Squats', description='Leg workout', difficulty='Easy')

        # Create Users
        ironman = User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel, is_leader=True)
        captain = User.objects.create(name='Captain America', email='cap@marvel.com', team=marvel)
        batman = User.objects.create(name='Batman', email='batman@dc.com', team=dc, is_leader=True)
        superman = User.objects.create(name='Superman', email='superman@dc.com', team=dc)

        # Create Activities
        Activity.objects.create(user=ironman, workout=pushups, duration_minutes=30, calories_burned=200)
        Activity.objects.create(user=captain, workout=running, duration_minutes=45, calories_burned=400)
        Activity.objects.create(user=batman, workout=squats, duration_minutes=20, calories_burned=150)
        Activity.objects.create(user=superman, workout=running, duration_minutes=60, calories_burned=600)

        # Create Leaderboard
        Leaderboard.objects.create(team=marvel, total_points=600, rank=1)
        Leaderboard.objects.create(team=dc, total_points=750, rank=1)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
