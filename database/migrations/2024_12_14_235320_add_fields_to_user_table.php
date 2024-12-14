<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->date('birthdate')->after('name')->nullable();
            $table->enum('gender', ['male', 'female'])->after('birthdate')->nullable();
            $table->smallInteger('weight')->after('gender')->nullable();
            $table->smallInteger('height')->after('weight')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('birthdate');
            $table->dropColumn('gender');
            $table->dropColumn('weight');
            $table->dropColumn('height');
        });
    }
};
