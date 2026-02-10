# frozen_string_literal: true

module Maglev
  module Assets
    class ActiveStorageProxyController < ::ActiveStorage::Blobs::ProxyController
      include Maglev::ResourceIdConcern

      private

      def set_blob
        asset = Maglev::Asset.find(resource_id)
        return head(:not_found) unless asset.file.attached?

        @blob = asset.file.blob
      rescue ActiveRecord::RecordNotFound
        head :not_found
      end
    end
  end
end
