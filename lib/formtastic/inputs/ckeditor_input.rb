# frozen_string_literal: true

module Formtastic
  module Inputs
    class CkeditorInput < Formtastic::Inputs::TextInput
      def to_html
        input_wrapping do
          label_html <<
            template.content_tag(:div, input_html_options.merge('data-activeadmin-ckeditor': '1')) do
              builder.hidden_field(input_name) <<
                template.content_tag(:div, 'data-activeadmin-ckcontent': '1') do
                  object.send(method).try :html_safe
                end
            end
        end
      end
    end
  end
end
