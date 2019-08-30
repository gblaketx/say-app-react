# RailsSettings Model
class Setting < RailsSettings::Base
  cache_prefix { "v1" }

  # Define your fields
  # field :host, type: :string, default: "http://localhost:3000"
  # field :default_locale, default: "en", type: :string
  # field :confirmable_enable, default: "0", type: :boolean
  # field :admin_emails, default: "admin@rubyonrails.org", type: :array
  # field :omniauth_google_client_id, default: (ENV["OMNIAUTH_GOOGLE_CLIENT_ID"] || ""), type: :string, readonly: true
  # field :omniauth_google_client_secret, default: (ENV["OMNIAUTH_GOOGLE_CLIENT_SECRET"] || ""), type: :string, readonly: true

  field :accepting_submissions, type: :boolean, default: false
  field :finalized, type: :boolean, default: false
  field :show_ratings, type: :boolean, default: false
  field :schools, type: :array, default: ["49ers Academy", "Blach Middle School", "Bullis Charter School", "California School for the Deaf", "Central Middle School (San Carlos)", "Chaboya Middle School", "Citizen Schools/Cesar Chavez", "Coliseum College Prep Academy", "Creekside Middle School", "East Palo Alto Charter School", "East Palo Alto Phoenix Academy", "El Portal Middle School", "Harvest Park Middle School", "Homeschooled", "Hopkins Junior High", "Horner Junior High", "JLS Middle School", "Joaquin Miller Middle School", "Joaquin Moraga Intermediate", "Jordan Middle School", "Kennedy Middle School", "Marin Teen Poets", "Martin Luther King Jr Middle School", "Mathson Middle School", "Montera Middle School", "Nea CLC", "North Star Academy", "Other", "Peterson Middle School", "Pine Valley Middle School", "Pleasanton Middle School", "Ralston Middle School", "Raymond J Fisher Middle School", "River Glen School", "Ronald McNair Middle School", "Saint Raymond School", "Seven Hills School", "Sierramont Middle School", "Sunol Glen School", "Synapse School ", "Thomas S Hart Middle School", "Tierra Linda Middle School", "Union Middle School", "Valley View Charter Prep", "Willow Oaks"]

  def self.generate_cvs_string(users_docs, users_art)
    require 'csv'     
    csv_string = CSV.generate do |csv|
       csv << ["First Name", "Last Name", "Email", "Bio", "School", "Teacher", "Type", "Title"]
       users_docs.each do |user|
         csv << [user.first_name, user.last_name, user.email, user.bio, user.school, user.teacher, user.style, user.title]
       end
       users_art.each do |user|
         csv << [user.first_name, user.last_name, user.email, user.bio, user.school, user.teacher, "Art", user.title]
       end
    end
  end
end
