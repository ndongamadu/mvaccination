from django.test import TestCase
from django.urls import reverse

class TestHomePage(TestCase):
	"""docstring for TestHomePage"""

	def test_using_base_template(self):
		response = self.client.get(reverse("home"))
		self.assertTemplateUsed(response, "home.html")