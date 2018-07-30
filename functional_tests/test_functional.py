from selenium import webdriver 
import unittest 


class NewVisitorTest(unittest.TestCase):
	"""docstring for NewVisitorTest"""
	def setUp(self):
		self.browser = webdriver.Firefox()
		#self.browser.implicitly_wait(3)

	def tearDown(self):
		self.browser.quit(2)

	def test_everything_is_working(self):
		self.browser.get('http://localhost:8000')

		#testing just if django is well launched
		self.assertIn('Django', self.browser.title)

if __name__ == '__main__':
	unittest.main(warnings='ignore')