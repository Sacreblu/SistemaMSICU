<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrabajosRecepcionalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trabajos_recepcionales', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->bigInteger('Id_Autor')->unsigned();
            $table->bigInteger('Id_Generacion')->unsigned();
            $table->bigInteger('Id_LGAC')->unsigned();
            $table->char('Titulo', 100)->nullable($value = false);
            $table->char('Estado', 20)->nullable($value = false);
            $table->char('Direccion_Repositorio', 250)->nullable();
            $table->char('Direccion_Documento', 250)->nullable();
            $table->char('Mes_Publicacion', 12)->nullable();
            $table->integer('Anio_Publicacion')->nullable();
            $table->char('Ruta_Archivo_Tesis', 200)->nullable();
            $table->char('Nombre_Archivo_Tesis', 100)->nullable();
            $table->char('Ruta_Acta_Examen', 200)->nullable();
            $table->char('Nombre_Acta_Examen', 100)->nullable();
            $table->timestamps();

            $table->foreign('Id_Generacion')->references('id')->on('generaciones')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('Id_Autor')->references('id')->on('estudiantes')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('trabajos_recepcionales');
    }
}
