<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLGACProfesoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('l_g_a_c_profesores', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id');
            $table->bigInteger('Id_Profesor')->unsigned();
            $table->bigInteger('Id_LGAC')->unsigned();
            $table->timestamps();

            $table->foreign('Id_Profesor')->references('id')->on('profesores')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('Id_LGAC')->references('id')->on('l_g_a_c_s')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('l_g_a_c_profesores');
    }
}
