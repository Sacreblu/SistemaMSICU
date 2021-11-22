<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrabSectEEAsociadasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trab_sect_e_e_asociadas', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->id('id');
            $table->bigInteger('idTrabajo')->unsigned();
            $table->bigInteger('idEE')->unsigned();

            $table->foreign('idTrabajo')->references('id')->on('trabajos_en_sectores')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('idEE')->references('id')->on('experiencias_educativas')->onDelete('cascade')->onUpdate('cascade');

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
        Schema::dropIfExists('trab_sect_e_e_asociadas');
    }
}
