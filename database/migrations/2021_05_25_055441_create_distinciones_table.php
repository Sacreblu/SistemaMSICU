<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDistincionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('distinciones', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id');
            $table->bigInteger('Id_Profesor')->unsigned();
            $table->char('Nombre_Distincion', 20);
            $table->integer('Anio');
            $table->char('Periodo', 40);
            $table->char('Descripcion', 180);
            $table->char('Ruta_Archivo', 200)->nullable();
            $table->char('NombreArchivo', 100)->nullable();
            $table->timestamps();
            
            $table->foreign('Id_Profesor')->references('id')->on('profesores')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('distinciones');
    }
}
