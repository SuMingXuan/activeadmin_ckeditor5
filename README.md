## ActiveadminCkeditor

Rails [activeadmin](https://github.com/activeadmin/activeadmin) integrated [CKEditor 5](https://ckeditor.com/docs/ckeditor5/latest/installation/index.html)
### Reference

[CKEditor5](https://github.com/SuMingXuan/ckeditor5-build-classic-for-rails/blob/master/build/ckeditor.js)

[activeadmin](https://github.com/activeadmin/activeadmin)

### Installation

Add this line to your application's Gemfile:

```ruby
gem 'activeadmin_ckeditor'
```

And then execute:

    $ bundle install

Or install it yourself as:

    $ gem install activeadmin_ckeditor

### Usage

```ruby
ActiveAdmin.register Article do
#...
  form do |f|
    f.inputs 'Article' do
      f.input :title, label: 'title'
      f.input :content, as: :ckeditor, label: 'content'
    end
    actions
  end
#...
end
```

Define uploading route

```ruby
  #config/routes.rb
  post :uploads, to: 'uploads#create'
```

Then define upload controller

```ruby
class UploadsController < ApplicationController
  def create
    #TODO
  end
end
```


You will get a `Can't verify CSRF token authenticity` error when you uploading image

You can redefine `csrf_meta_tag` location

```ruby
# config/initializers/active_admin_layout.rb
module AdminPageLayoutOverride
  def build_active_admin_head
    within head do
      # CKEditor simpleUpload components will use csrfToken, but can't find csrf_meta_tag when loading js
      # so the csrf_meta_tag is generated in advance here.
      text_node csrf_meta_tag
    end

    super
  end
end
ActiveAdmin::Views::Pages::Base.send :prepend, AdminPageLayoutOverride
```

Or skip verify authenticity token

```ruby
class AdminUploadsController < AdminApplicationController
  skip_forgery_protection
  def create
    #TODO
  end
end
```


