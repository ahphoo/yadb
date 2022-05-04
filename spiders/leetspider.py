import scrapy

class LeetSpider(scrapy.Spider):
    name = 'leetspider'
    start_urls = ['https://leetcode.com/problems/two-sum/']

    def parse(self, response):
        page = response.url.split("/")[-2]
        filename = f'{page}.html'
        with open(filename, 'wb') as f:
            f.write(response.body)