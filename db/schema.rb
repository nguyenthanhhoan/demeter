# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170529172824) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cameras", force: :cascade do |t|
    t.string   "camera_no"
    t.string   "camera_name"
    t.integer  "api",           default: 0
    t.string   "live_hash"
    t.string   "playback_hash"
    t.string   "secret_id"
    t.string   "channel"
    t.string   "server"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  create_table "cameras_zones", force: :cascade do |t|
    t.integer "camera_id"
    t.integer "zone_id"
    t.boolean "is_primary"
    t.index ["camera_id", "zone_id"], name: "cameras_zones_index", unique: true, using: :btree
  end

  create_table "device_fields", force: :cascade do |t|
    t.integer  "device_id"
    t.string   "field_id"
    t.string   "name"
    t.string   "name_display"
    t.string   "description"
    t.string   "value"
    t.integer  "interval"
    t.datetime "last_updated"
    t.integer  "status"
    t.integer  "field_attribute"
    t.integer  "value_data_type"
    t.integer  "update_type"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "chart_value_suffix"
    t.float    "chart_value_diff"
    t.index ["device_id"], name: "index_device_fields_on_device_id", using: :btree
  end

  create_table "device_fields_zones", force: :cascade do |t|
    t.integer "device_field_id"
    t.integer "zone_id"
    t.integer "link_type",       default: 0
    t.index ["device_field_id", "zone_id", "link_type"], name: "device_fields_zones_index", unique: true, using: :btree
  end

  create_table "devices", force: :cascade do |t|
    t.string   "name"
    t.integer  "device_type"
    t.integer  "api"
    t.integer  "created_by_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["created_by_id"], name: "index_devices_on_created_by_id", using: :btree
  end

  create_table "okr_objective_keys", force: :cascade do |t|
    t.integer  "okr_objective_id"
    t.text     "description"
    t.integer  "status"
    t.string   "pic"
    t.date     "start_date"
    t.date     "original_deadline"
    t.date     "deadline1"
    t.text     "note"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.index ["okr_objective_id"], name: "index_okr_objective_keys_on_okr_objective_id", using: :btree
  end

  create_table "okr_objectives", force: :cascade do |t|
    t.integer  "okr_id"
    t.date     "date_from"
    t.date     "date_to"
    t.string   "objective"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["okr_id"], name: "index_okr_objectives_on_okr_id", using: :btree
  end

  create_table "okrs", force: :cascade do |t|
    t.integer  "zone_id"
    t.integer  "order"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["zone_id"], name: "index_okrs_on_zone_id", using: :btree
  end

  create_table "projects", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.float    "surface"
    t.integer  "labour"
    t.string   "location"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.string   "image"
    t.string   "location_geometry"
    t.index ["user_id"], name: "index_projects_on_user_id", using: :btree
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.string   "resource_type"
    t.integer  "resource_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
    t.index ["name"], name: "index_roles_on_name", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.json     "tokens"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree
  end

  create_table "users_roles", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "role_id"
    t.index ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree
  end

  create_table "w_underground_caches", force: :cascade do |t|
    t.string   "location"
    t.string   "service_type"
    t.text     "content"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "zones", force: :cascade do |t|
    t.integer  "project_id"
    t.string   "name"
    t.string   "zone_id"
    t.date     "start_date"
    t.date     "end_date"
    t.string   "plant"
    t.string   "plant_variety"
    t.integer  "plant_quantity"
    t.string   "plant_quantity_unit"
    t.string   "production_type"
    t.float    "estimate_yield"
    t.string   "estimate_yield_unit"
    t.float    "surface"
    t.string   "surface_unit"
    t.string   "zone_type"
    t.string   "growing_condition_type"
    t.string   "ownership_type"
    t.integer  "labour"
    t.string   "location"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "image"
    t.string   "location_geometry"
    t.string   "setting"
    t.string   "device_gateway"
    t.index ["project_id"], name: "index_zones_on_project_id", using: :btree
  end

  add_foreign_key "device_fields", "devices"
  add_foreign_key "okr_objective_keys", "okr_objectives"
  add_foreign_key "okr_objectives", "okrs"
  add_foreign_key "okrs", "zones"
  add_foreign_key "zones", "projects"
end
