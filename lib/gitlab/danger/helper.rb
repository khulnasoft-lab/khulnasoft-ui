# frozen_string_literal: true

require_relative 'teammate'

module Gitlab
  module Danger
    module Helper
      RELEASE_TOOLS_BOT = 'gitlab-release-tools-bot'

      # Returns a list of all files that have been added, modified or renamed.
      # `git.modified_files` might contain paths that already have been renamed,
      # so we need to remove them from the list.
      #
      # Considering these changes:
      #
      # - A new_file.rb
      # - D deleted_file.rb
      # - M modified_file.rb
      # - R renamed_file_before.rb -> renamed_file_after.rb
      #
      # it will return
      # ```
      # [ 'new_file.rb', 'modified_file.rb', 'renamed_file_after.rb' ]
      # ```
      #
      # @return [Array<String>]
      def all_changed_files
        Set.new
           .merge(git.added_files.to_a)
           .merge(git.modified_files.to_a)
           .merge(git.renamed_files.map { |x| x[:after] })
           .subtract(git.renamed_files.map { |x| x[:before] })
           .to_a
           .sort
      end

      def gitlab_helper
        # Unfortunately the following does not work:
        # - respond_to?(:gitlab)
        # - respond_to?(:gitlab, true)
        gitlab
      rescue NoMethodError
        nil
      end

      def release_automation?
        gitlab_helper&.mr_author == RELEASE_TOOLS_BOT
      end

      def markdown_list(items)
        list = items.map { |item| "* `#{item}`" }.join("\n")

        if items.size > 10
          "\n<details>\n\n#{list}\n\n</details>\n"
        else
          list
        end
      end

      # @return [Hash<String,Array<String>>]
      def changes_by_category
        all_changed_files.each_with_object(Hash.new { |h, k| h[k] = [] }) do |file, hash|
          hash[category_for_file(file)] << file
        end
      end

      # Determines the category a file is in, e.g., `:frontend` or `:backend`
      # @return[Symbol]
      def category_for_file(file)
        _, category = CATEGORIES.find { |regexp, _| regexp.match?(file) }

        category || :frontend
      end

      # Returns the GFM for a category label, making its best guess if it's not
      # a category we know about.
      #
      # @return[String]
      def label_for_category(category)
        CATEGORY_LABELS.fetch(category, "~#{category}")
      end

      def component_labels
        gitlab_helper&.mr_labels.select { |label| label.start_with?('component:') }
      end

      def ux_reviewers_for_label(label)
        component = label.sub('component:', '')
        COMPONENT_UX_MAP[component.to_sym] || []
      end

      def foundations_ux_reviewers
        %w[
          tauriedavis
          aregnery
          jeldergl
        ]
      end

      CATEGORY_LABELS = {
        docs: '~documentation'
      }.freeze
      CATEGORIES = {
        %r{\Adoc/} => :docs
      }.freeze
      COMPONENT_UX_MAP = {
        accordion: %w[kcomoli rayana],
        alert: %w[andyvolpe],
        avatar: %w[tauriedavis],
        badge: %w[pedroms],
        banner: %w[andyvolpe],
        breadcrumb: %w[ameliabauerly],
        'broadcast-message': %w[jeldergl],
        button: %w[jeldergl],
        card: %w[beckalippert],
        chart: %w[ameliabauerly],
        checkbox: %w[pedroms],
        'data-visualization': %w[ameliabauerly],
        'date-picker': %w[tauriedavis],
        drawer: %w[andyvolpe],
        dropdown: %w[jeldergl],
        'file-uploader': %w[aregnery],
        filter: %w[matejlatin],
        form: %w[tauriedavis],
        icon: %w[jeldergl],
        'infinite-scroll': %w[beckalippert],
        label: %w[annabeldunstone],
        link: %w[jeldergl],
        list: %w[tauriedavis],
        modal: %w[aregnery],
        pagination: %w[andyvolpe],
        popover: %w[tauriedavis],
        'progress-bar': %w[aregnery],
        radio: %w[pedroms],
        search: %w[matejlatin],
        'segmented-control': %w[andyvolpe],
        'skeleton-loader': %w[tauriedavis],
        sorting: %w[ameliabauerly],
        spinner: %w[jeldergl],
        tab: %w[aregnery],
        table: %w[npost],
        toast: %w[tauriedavis],
        toggle: %w[pedroms],
        token: %w[annabeldunstone],
        tooltip: %w[rayana],
        tree: %w[kcomoli rayana]
      }.freeze
    end
  end
end
