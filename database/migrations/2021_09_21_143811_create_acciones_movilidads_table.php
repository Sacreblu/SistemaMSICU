<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccionesMovilidadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('acciones_movilidads', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id');
            $table->bigInteger('IdConvenio')->unsigned();
            $table->bigInteger('IdEstudiante')->unsigned();
            $table->date('PeriodoInicio')->nullable();
            $table->date('PeriodoConclusion')->nullable();
            $table->char('InstitucionOrigen', 100)->nullable();
            $table->char('InstitucionDestino', 100)->nullable();
            $table->char('DependenciaOrigen', 50)->nullable();
            $table->char('DependenciaDestino', 50)->nullable();
            $table->char('ProgramaOrigen', 70)->nullable();
            $table->char('ProgramaDestino', 70)->nullable();
            $table->text('Motivo', 350)->nullable();

            $table->text('RutaFormatoSolicitud', 350)->nullable();
            $table->text('NombreFormatoSolicitud', 250)->nullable();
            $table->text('RutaCartaMovilidad', 350)->nullable();
            $table->text('NombreCartaMovilidad', 250)->nullable();
            $table->text('RutaCartaAceptacion', 350)->nullable();
            $table->text('NombreCartaAceptacion', 250)->nullable();
            $table->text('RutaReporteActividades', 350)->nullable();
            $table->text('NombreReporteActividades', 250)->nullable();
            $table->text('RutaCartaCumplimiento', 350)->nullable();
            $table->text('NombreCartaCumplimiento', 250)->nullable();
            $table->text('RutaCartaLiberacion', 350)->nullable();
            $table->text('NombreCartaLiberacion', 250)->nullable();
            $table->text('RutaArchivoCongreso', 350)->nullable();
            $table->text('NombreArchivoCongreso', 250)->nullable();

            $table->timestamps();

            $table->foreign('IdConvenio')->references('id')->on('convenios_movilidads')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('IdEstudiante')->references('id')->on('estudiantes')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('acciones_movilidads');
    }
}
