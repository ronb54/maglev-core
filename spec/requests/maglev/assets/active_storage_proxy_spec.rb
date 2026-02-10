# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Maglev::Assets::ActiveStorageProxyController' do
  let(:asset) { create(:asset) }

  it 'allows retrieval by id' do
    get "/maglev/assets/#{asset.id}/gibberish"
    expect(response.body).to eq(IO.binread(file_fixture('asset.jpg')))
    expect(response.headers['cache-control']).to match('max-age=3155695200, public')
  end

  it 'returns 404 when an asset has no attached file' do
    orphan = create(:asset)
    orphan.file.purge

    get "/maglev/assets/#{orphan.id}/gibberish"

    expect(response).to have_http_status(:not_found)
  end
end
