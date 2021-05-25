<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLGACSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('l_g_a_c_s', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id');
            $table->char('Nombre', 150)->nullable($value = false);
            $table->char('Vigente', 3);
            $table->bigInteger('Id_Plan')->unsigned();
            $table->timestamps();
            $table->foreign('Id_Plan')->references('id')->on('plan_estudios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('l_g_a_c_s');
    }
}
