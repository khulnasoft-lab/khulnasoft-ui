# frozen_string_literal: true

require 'gitlab-dangerfiles'

Gitlab::Dangerfiles.for_project(self) do |gitlab_dangerfiles|

  gitlab_dangerfiles.import_plugins

  gitlab_dangerfiles.config.files_to_category = {
    %r{\Adoc/} => :docs,
    %r{.*} => :frontend
  }.freeze

  gitlab_dangerfiles.import_dangerfiles(except: %w[changelog commit_messages])
end
