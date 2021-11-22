<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrabajosEnSectoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trabajos_en_sectores', function (Blueprint $table) {
            $table->engine = 'InnoDB';

            $table->id('id');
            $table->bigInteger('IdConvenio')->unsigned();
            $table->char('Institucion', 100)->nullable();
            $table->char('NombreProyecto', 150)->nullable();
            $table->char('ResponsableProyecto', 60)->nullable();
            $table->bigInteger('ProfResponsable')->unsigned();
            $table->year('anioInicio');
            $table->year('anioFin');
            $table->text('RutaArchivoEvidencia', 350)->nullable();
            $table->text('NombreArchivoEvidencia', 250)->nullable();

            $table->foreign('IdConvenio')->references('id')->on('convenios_movilidads')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('ProfResponsable')->references('id')->on('profesores')->onDelete('cascade')->onUpdate('cascade');
            
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
        Schema::dropIfExists('trabajos_en_sectores');
    }
}
