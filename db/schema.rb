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

ActiveRecord::Schema.define(version: 20170323180633) do

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

  create_table "projects", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name"
    t.float    "surface"
    t.integer  "labour"
    t.string   "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "image"
    t.index ["user_id"], name: "index_projects_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
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
    t.index ["project_id"], name: "index_zones_on_project_id", using: :btree
  end

  add_foreign_key "projects", "users"
  add_foreign_key "zones", "projects"
end
