from selenium import webdriver 
import unittest 
from django.urls import reverse
from django.contrib.staticfiles.testing import LiveServerTestCase

class NewVisitorTest(unittest.TestCase):
	"""docstring for NewVisitorTest"""
	def setUp(self):
		self.browser = webdriver.Firefox()
		self.browser.implicitly_wait(3)

	def tearDown(self):
		self.browser.quit()

	# def get_full_url(self, namespace):
	# 	return self.live_server_url + reverse(namespace)

	def test_work_title(self):
		self.browser.get("http:localhost:8000")

		#testing just if django is well launched
		self.assertIn('Welcome To | Bootstrap', self.browser.title)

if __name__ == '__main__':
	unittest.main(warnings='ignore')