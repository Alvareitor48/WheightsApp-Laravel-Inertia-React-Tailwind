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
        Schema::create('series', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exercises_routines_id')->constrained()->cascadeOnDelete();
            $table->smallInteger('repetitions')->nullable();
            $table->time('duration')->nullable();
            $table->tinyInteger('RIR')->nullable();
            $table->boolean('failure')->default(false);
            $table->double('weight')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('series');
    }
};