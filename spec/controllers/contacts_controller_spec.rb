require 'rails_helper'

RSpec.describe ContactsController, type: :controller do
  let(:user) { create(:user) }
  let(:contact) { create(:contact, user: user) }

  before do
    allow(controller).to receive(:authenticate_user!).and_return(true)
    allow(controller).to receive(:current_user).and_return(user)
  end

  describe "GET #index" do
    before { get :index }
    it "assigns the user's email" do
      expect(assigns(:user_email)).to eq user.email
    end

    it "assigns the serialized contacts" do
      expect(assigns(:contacts_serialized)).not_to be_nil
    end

    it "assigns the total pages" do
      expect(assigns(:total_pages)).not_to be_nil
    end
  end

  describe "POST #create" do
    let(:valid_attributes) { params_from_json('contact/newContact') }

    context "with valid attributes" do
      it "creates a new contact" do
        expect {
          post :create, params: valid_attributes
        }.to change(Contact, :count).by(1)
      end

      it "returns a success response" do
        post :create, params: valid_attributes
        expect(response).to have_http_status(:success)
      end
    end

    context "with invalid attributes" do
      it "does not create a new contact" do
        expect {
          post :create, params: { full_name: nil }
        }.to change(Contact, :count).by(0)
      end

      it "returns an error response" do
        post :create, params: { full_name: nil }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "GET #show" do
    before { get :show, params: { id: contact.id } }

    it "returns a success response" do
      expect(response).to have_http_status(:success)
    end

    it "returns the serialized contact" do
      expect(JSON.parse(response.body)).not_to be_nil
    end
  end

  describe "GET #search" do
    let(:name_splitted) { contact.full_name.split(" ") }
    let!(:contact2) { create(:contact, full_name: "#{name_splitted.first} Martins", user: user) }
    before { get :search, params: { full_name: name_splitted.first } }

    it "returns a success response" do
      expect(response).to have_http_status(:success)
    end

    it "returns list of contact" do
      expect(JSON.parse(response.body)['results'].count).to eq(2)
    end

    it "returns total of pages" do
      expect(JSON.parse(response.body)['total_pages']).to eq(1)
    end
  end

  describe "DELETE #destroy" do
    before { delete :destroy, params: { id: contact.id } }

    it "returns a 200 status code" do
      expect(response).to have_http_status(200)
    end

    it "returns a success message" do
      expect(JSON.parse(response.body)["message"]).to eq("Deleted contact with success")
    end

    it "deletes the contact" do
      expect { contact.reload }.to raise_error ActiveRecord::RecordNotFound
    end
  end

  describe "PUT #update" do
    before { put :update, params: { id: contact.id, **params } }

    context "with valid params" do
      let(:params) { params_from_json('contact/updateContact') }

      it "returns a 200 status code" do
        expect(response).to have_http_status(200)
      end

      it "returns the updated contact" do
        expect(JSON.parse(response.body)["contact"]["full_name"]).to eq(params[:full_name])
      end

      it "updates the contact" do
        expect(contact.reload.full_name).to eq(params[:full_name])
      end
    end

    context "with invalid params" do
      let(:params) { {full_name: nil} }

      it "returns a 422 status code" do
        expect(response).to have_http_status(422)
      end

      it "returns an error message" do
        expect(JSON.parse(response.body)["error"]).to eq("Validation failed: Full name can't be blank")
      end

      it "does not update the contact" do
        expect(contact.reload.full_name).not_to eq(nil)
      end
    end
  end
end
