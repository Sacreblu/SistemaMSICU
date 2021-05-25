<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(Tipo_Contratacion::class);
        $this->call(Tipo_Colaboracion::class);
        $this->call(Pais::class);
        $this->call(GradoAcademico::class);
        $this->call(Documentos_Superacion::class);
        $this->call(TrayectoriaProfesional::class);
    }
}
