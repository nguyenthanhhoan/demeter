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

ActiveRecord::Schema.define(version: 20170927162328) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "pgcrypto"

  create_table "alert_rules", force: :cascade do |t|
    t.string   "name"
    t.integer  "device_field_id"
    t.integer  "zone_id"
    t.string   "condition"
    t.string   "value"
    t.integer  "interval"
    t.boolean  "live_chart_rule"
    t.boolean  "is_active"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.string   "schedule"
    t.datetime "from_time"
    t.datetime "to_time"
    t.boolean  "trigger_email"
    t.string   "trigger_emails"
    t.boolean  "trigger_message"
    t.string   "trigger_messages"
    t.boolean  "trigger_call"
    t.string   "trigger_calls"
    t.index ["device_field_id"], name: "index_alert_rules_on_device_field_id", using: :btree
    t.index ["zone_id"], name: "index_alert_rules_on_zone_id", using: :btree
  end

  create_table "alerts", force: :cascade do |t|
    t.integer  "alert_rule_id"
    t.integer  "zone_id"
    t.string   "alert_content"
    t.string   "icon"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["alert_rule_id"], name: "index_alerts_on_alert_rule_id", using: :btree
    t.index ["zone_id"], name: "index_alerts_on_zone_id", using: :btree
  end

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
    t.integer  "update_rate"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "chart_value_suffix"
    t.float    "chart_value_diff"
    t.integer  "value_in_int"
    t.float    "value_in_float"
    t.string   "icon"
    t.string   "hash_id"
    t.datetime "value_updated_at"
    t.index ["device_id"], name: "index_device_fields_on_device_id", using: :btree
  end

  create_table "device_fields_zones", force: :cascade do |t|
    t.integer "device_field_id"
    t.integer "zone_id"
    t.integer "link_type",       default: 0
    t.integer "order"
    t.index ["device_field_id", "zone_id", "link_type"], name: "device_fields_zones_index", unique: true, using: :btree
  end

  create_table "device_value_histories", force: :cascade do |t|
    t.integer  "device_field_id"
    t.string   "value"
    t.datetime "updated_at",      null: false
    t.datetime "created_at",      null: false
    t.index ["device_field_id"], name: "index_device_value_histories_on_device_field_id", using: :btree
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

  create_table "family_cameras", force: :cascade do |t|
    t.integer  "family_package_camera_id"
    t.string   "live_hash"
    t.string   "playback_hash"
    t.string   "secret_id"
    t.string   "channel"
    t.string   "server"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.index ["family_package_camera_id"], name: "index_family_cameras_on_family_package_camera_id", using: :btree
  end

  create_table "family_devices", force: :cascade do |t|
    t.integer  "family_package_id"
    t.string   "name"
    t.string   "value"
    t.integer  "value_in_int"
    t.float    "value_in_float"
    t.string   "field_id"
    t.datetime "value_updated_at"
    t.integer  "field_attribute"
    t.integer  "value_data_type"
    t.string   "chart_value_suffix"
    t.integer  "mode"
    t.datetime "created_at",                                                null: false
    t.datetime "updated_at",                                                null: false
    t.uuid     "uuid",                 default: -> { "gen_random_uuid()" }, null: false
    t.datetime "timer_start_date"
    t.datetime "timer_end_date"
    t.json     "timer_daily_schedule"
    t.json     "events"
    t.index ["family_package_id"], name: "index_family_devices_on_family_package_id", using: :btree
  end

  create_table "family_notifications", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "noti_type"
    t.string   "content"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.boolean  "is_read",    default: false
    t.index ["user_id"], name: "index_family_notifications_on_user_id", using: :btree
  end

  create_table "family_package_cameras", force: :cascade do |t|
    t.string   "salt"
    t.integer  "length"
    t.string   "hash_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "family_project_id"
    t.index ["family_project_id"], name: "index_family_package_cameras_on_family_project_id", using: :btree
  end

  create_table "family_packages", force: :cascade do |t|
    t.string   "salt"
    t.integer  "length"
    t.string   "setting"
    t.string   "hash_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "family_project_id"
    t.index ["family_project_id"], name: "index_family_packages_on_family_project_id", using: :btree
  end

  create_table "family_project_alerts", force: :cascade do |t|
    t.integer  "family_project_id"
    t.json     "rules"
    t.integer  "interval"
    t.boolean  "trigger_notification"
    t.string   "trigger_notifications"
    t.boolean  "trigger_email"
    t.string   "trigger_emails"
    t.boolean  "trigger_message"
    t.string   "trigger_messages"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.index ["family_project_id"], name: "index_family_project_alerts_on_family_project_id", using: :btree
  end

  create_table "family_projects", force: :cascade do |t|
    t.string   "name"
    t.string   "image"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_family_projects_on_user_id", using: :btree
  end

  create_table "invitations", force: :cascade do |t|
    t.string   "email"
    t.integer  "role"
    t.string   "token"
    t.string   "resource_name"
    t.integer  "resource_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
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

  create_table "program_executions", force: :cascade do |t|
    t.string   "name"
    t.integer  "zone_id"
    t.boolean  "is_active"
    t.string   "input"
    t.string   "output"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "schedule"
    t.datetime "from_time"
    t.datetime "to_time"
    t.index ["zone_id"], name: "index_program_executions_on_zone_id", using: :btree
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
    t.string   "hash_id"
    t.index ["user_id"], name: "index_projects_on_user_id", using: :btree
  end

  create_table "registrations", force: :cascade do |t|
    t.string   "email"
    t.string   "phone"
    t.string   "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.string   "full_name"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "username"
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
    t.datetime "created_at",                                          null: false
    t.datetime "updated_at",                                          null: false
    t.string   "image"
    t.string   "location_geometry"
    t.string   "setting"
    t.string   "device_gateway"
    t.string   "time_zone",              default: "Asia/Ho_Chi_Minh"
    t.string   "hash_id"
    t.integer  "user_id"
    t.index ["project_id"], name: "index_zones_on_project_id", using: :btree
    t.index ["user_id"], name: "index_zones_on_user_id", using: :btree
  end

  add_foreign_key "alert_rules", "device_fields"
  add_foreign_key "alert_rules", "zones"
  add_foreign_key "alerts", "alert_rules"
  add_foreign_key "alerts", "zones"
  add_foreign_key "device_fields", "devices"
  add_foreign_key "device_value_histories", "device_fields"
  add_foreign_key "family_cameras", "family_package_cameras"
  add_foreign_key "family_devices", "family_packages"
  add_foreign_key "family_notifications", "users"
  add_foreign_key "family_package_cameras", "family_projects"
  add_foreign_key "family_packages", "family_projects"
  add_foreign_key "family_project_alerts", "family_projects"
  add_foreign_key "family_projects", "users"
  add_foreign_key "okr_objective_keys", "okr_objectives"
  add_foreign_key "okr_objectives", "okrs"
  add_foreign_key "okrs", "zones"
  add_foreign_key "program_executions", "zones"
  add_foreign_key "zones", "projects"
  add_foreign_key "zones", "users"
end
