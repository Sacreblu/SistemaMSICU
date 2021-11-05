<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExperienciasEducativas extends Model
{
    protected $fillable = [
        'id',
        'id_Plan',
        'NombreEE',
        'Area',
        'Creditos',
        'HrsTeoriaConProfesor',
        'HrsTeoriaSinProfesor',
        'HrsPracticasConProfesor',
        'HrsPracticasSinProfesor'
    ];

    public function registrarEE($request){
        $datos = new ExperienciasEducativas ([
            'id_Plan'=> $request->get('Id_Plan'),
            'NombreEE'=> $request->get('NombreEE'),
            'Creditos'=> $request->get('CreditosEE'),
            'Area'=> $request->get('Area'),
            'HrsTeoriaConProfesor'=> $request->get('TeoriaConProfesorEE'),
            'HrsTeoriaSinProfesor'=> $request->get('TeoriaSinProfesorEE'),
            'HrsPracticasConProfesor'=> $request->get('PracticasConProfesorEE'),
            'HrsPracticasSinProfesor'=> $request->get('PracticasSinProfesorEE')
        ]); 
        $datos->save();
        return "Experiencia Educativa Registrada";
    }

    public function modificarEE($request, $id){

        $ee = ExperienciasEducativas::find($id);
        $ee->id_Plan = $request->get('Id_Plan');
        $ee->NombreEE = $request->get('NombreEE');
        $ee->Creditos = $request->get('CreditosEE');
        $ee->Area = $request->get('Area');
        $ee->HrsTeoriaConProfesor = $request->get('TeoriaConProfesorEE');
        $ee->HrsTeoriaSinProfesor = $request->get('TeoriaSinProfesorEE');
        $ee->HrsPracticasConProfesor = $request->get('PracticasConProfesorEE');
        $ee->HrsPracticasSinProfesor = $request->get('PracticasSinProfesorEE');
        $ee->Area = $request->get('Area');
        
        $ee->save();
        return "Experiencia Educativa Modificada";
    }

    public function busquedaEE($request){
        $texto = $request->busqueda;
        $check = $request->check;

        $ee= ExperienciasEducativas::join('plan_estudios', 'experiencias_educativas.id_Plan', '=', 'plan_estudios.id')
                ->select('experiencias_educativas.*', 'plan_estudios.Nombre as planNombre')
                ->where('experiencias_educativas.'.$check, 'like', '%'.$texto.'%')->get();

        return $ee;
    }

    public function filtradoEE($request){
        $mostrar = $request->get('mostrar');

        switch ($mostrar) {
            case 'Todos':
                $ee= ExperienciasEducativas::join('plan_estudios', 'experiencias_educativas.id_Plan', '=', 'plan_estudios.id')
                ->select('experiencias_educativas.*', 'plan_estudios.Nombre as planNombre')
                ->orderBy('experiencias_educativas.NombreEE', 'ASC')->get();
                break;
            default:
                $ee= ExperienciasEducativas::join('plan_estudios', 'experiencias_educativas.id_Plan', '=', 'plan_estudios.id')
                ->select('experiencias_educativas.*', 'plan_estudios.Nombre as planNombre')
                ->where('experiencias_educativas.Area', '=', $mostrar)
                ->orderBy('experiencias_educativas.NombreEE', 'ASC')->get();
                break;
        }
        return $ee;
    }

    public function ObtenerEE(){
        $ee= ExperienciasEducativas::join('plan_estudios', 'experiencias_educativas.id_Plan', '=', 'plan_estudios.id')
        ->select('experiencias_educativas.id', 'NombreEE', 'id_Plan', 'Area', 'plan_estudios.Nombre')
        ->orderBy('NombreEE', 'ASC')->get();
        return $ee;
    }
}
