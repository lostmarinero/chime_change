class ChimesController < ApplicationController

  TWITTER_API_KEY = "chNSM34FyGKAYYIPnJlIA".freeze
  TWITTER_API_SECRET = "19HQdL3HMh34ZEkmmx9mQswIuu7pZ4q4yDQgFQ6M7c".freeze
  TWITTER_ACCESS_TOKEN = "14895163-lTHSC5DFlKGFcma2EkVLBmb6XUyPSUgF9ZJyrf90m".freeze
  TWITTER_ACCESS_TOKEN_SECRET = "eZBmJsi6dMkTGUzOD1KCCIbvKGdHEPGliaCLEAOgTyOA6".freeze

  def index
    # Exchange our oauth_token and oauth_token secret for the AccessToken instance.
    access_token = prepare_access_token(TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET)

    # Use the access token as an agent to get the home timeline
    url = URI::escape("https://api.twitter.com/1.1/search/tweets.json?q=#Chime4Education")
    response = access_token.request(:get, url)
  end


  private
  # Exchange your oauth_token and oauth_token_secret for an AccessToken instance.
  def prepare_access_token(oauth_token, oauth_token_secret)
    consumer = OAuth::Consumer.new(TWITTER_API_KEY, TWITTER_API_SECRET,
      {
        :site => "http://api.twitter.com",
        :scheme => :header
      })

    # Now create the access token object from passed values
    token_hash = {
      :oauth_token => oauth_token,
      :oauth_token_secret => oauth_token_secret
    }
    OAuth::AccessToken.from_hash(consumer, token_hash)
  end
end