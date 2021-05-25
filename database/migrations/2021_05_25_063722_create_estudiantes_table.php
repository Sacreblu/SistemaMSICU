<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstudiantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id('id');
            $table->integer('No_CVU')->nullable($value = false)->unique();
            $table->bigInteger('Id_Generacion')->unsigned();
            $table->bigInteger('Id_Plan')->unsigned();
            $table->bigInteger('Id_LGAC')->unsigned();
            $table->char('Matricula')->nullable($value = false)->unique();
            $table->char('Nombre', 30)->nullable($value = false);
            $table->char('Apellido_P', 20)->nullable($value = false);
            $table->char('Apellido_M', 20)->nullable($value = false);
            $table->char('Correo', 40)->nullable($value = false)->unique();
            $table->char('CorreoPersonal', 40)->nullable()->unique();
            $table->char('Estado', 8)->nullable($value = false);
            $table->char('NombreCarta', 100)->nullable();
            $table->char('Ruta_Carta', 200)->nullable();

            $table->timestamps();

            $table->foreign('Id_Generacion')->references('id')->on('generaciones')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('Id_Plan')->references('id')->on('plan_estudios')->onDelete('cascade')->onUpdate('cascade');
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
        Schema::dropIfExists('estudiantes');
    }
}
