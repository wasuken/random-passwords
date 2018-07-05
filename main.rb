require 'securerandom'
require 'sinatra'

CHRS_LST = [("a".."z").to_a,
            ("A".."Z").to_a,
            ("0".."9").to_a]

def my_secure_chr()
  CHRS_LST.shuffle.first.shuffle.first
end
def my_secure_str(n)
  result=""
  n.times{
    result+=my_secure_chr
  }
  result
end
def list_pass_str(list_n,pass_len)
  result=[]
  list_n.times{
    result = result.push my_secure_str(pass_len)
  }
  result
end
get '/' do
  insert_str = list_pass_str(8,8).map{|n| "<li>#{n}</li>"}.join
  "<ul>#{insert_str}</ul>"
end
get '/:ln' do
  insert_str = list_pass_str(params[:ln].to_i,8).map{|n| "<li>#{n}</li>"}.join
  "<ul>#{insert_str}</ul>"
end
get '/:ln/:pl' do
  insert_str = list_pass_str(params[:ln].to_i,params[:pl].to_i).map{|n| "<li>#{n}</li>"}.join
  "<ul>#{insert_str}</ul>"
end
