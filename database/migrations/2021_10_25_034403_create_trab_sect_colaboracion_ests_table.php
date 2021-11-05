<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrabSectColaboracionEstsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trab_sect_colaboracion_ests', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->id('id');
            $table->bigInteger('idTrabajo')->unsigned();
            $table->bigInteger('idEstudiante')->unsigned();

            $table->foreign('idTrabajo')->references('id')->on('trabajos_en_sectores')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('idEstudiante')->references('id')->on('estudiantes')->onDelete('cascade')->onUpdate('cascade');

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
        Schema::dropIfExists('trab_sect_colaboracion_ests');
    }
}
