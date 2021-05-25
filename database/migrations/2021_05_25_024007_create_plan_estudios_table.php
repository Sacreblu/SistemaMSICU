<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePlanEstudiosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('plan_estudios', function (Blueprint $table) {
            $table->id('id');
            $table->char('Nombre', 50)->nullable($value = false)->unique();
            $table->integer('Anio');
            $table->char('Vigente', 3);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('plan_estudios');
    }
}
