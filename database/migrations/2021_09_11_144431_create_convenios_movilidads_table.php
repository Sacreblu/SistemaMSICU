<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConveniosMovilidadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('convenios_movilidads', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id');
            $table->char('Nombre_Convenio', 30)->nullable($value = false);
            $table->bigInteger('Sector')->unsigned();
            $table->date('Fecha_Inicio');
            $table->date('Fecha_Conclusion');
            $table->char('Institucion_Organizacion', 50)->nullable($value = false);
            $table->char('Ciudad', 30)->nullable($value = false);
            $table->bigInteger('Pais')->unsigned(); 
            $table->text('Ruta_Evidencia', 350)->nullable();
            $table->text('Nombre_Evidencia', 250)->nullable();
            $table->char('Estado', 15)->nullable($value = false);

            $table->timestamps();

            $table->foreign('Sector')->references('id')->on('paises')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('Pais')->references('id')->on('paises')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('convenios_movilidads');
    }
}
