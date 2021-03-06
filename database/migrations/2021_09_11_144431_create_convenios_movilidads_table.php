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
            $table->char('Nombre_Clave', 120)->nullable();
            $table->char('Dependencia', 50)->nullable();
            $table->char('NombreCongreso', 80)->nullable();
            $table->char('AcronimoCongreso', 20)->nullable();
            $table->bigInteger('Sector')->unsigned();
            $table->date('Fecha_Inicio');
            $table->date('Fecha_Conclusion')->nullable();
            $table->char('Institucion_Organizacion', 100)->nullable($value = false);
            $table->char('Ciudad', 30)->nullable($value = false);
            $table->bigInteger('Pais')->unsigned(); 
            $table->text('Ruta_Evidencia', 390)->nullable();
            $table->text('Nombre_Evidencia', 290)->nullable();
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
