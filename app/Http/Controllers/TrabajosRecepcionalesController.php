<?php

namespace App\Http\Controllers;

use App\TrabajosRecepcionales;
use App\Generaciones;
use App\Evaluadores;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TrabajosRecepcionalesController extends Controller
{
    public function mostrarTesis(){
        $objeto = new TrabajosRecepcionales();
        $result = $objeto->MostrarTrabajosRecepcionales();
        
        return view('TrabajoRecepcional.verTrabajosRecepcionales', compact('result'));
    }

    public function registrarTesisVista(){
        return view('TrabajoRecepcional.registrarTrabajoRecepcional');
    }

    public function VistaModificarTrabajo($id){
        $request = new Request();
        $request->request->add(['idTesis' => $id]);
        $informacion = new TrabajosRecepcionalesController();
        $informacion = $informacion->obtenerInformacionTesis($request);

        return view('TrabajoRecepcional.modificarTrabajoRecepcional', compact('informacion'));
    }

    public function FiltradoTesis(Request $request){
        $tesis = new TrabajosRecepcionales();
        return $tesis->FiltradoTesis($request);
    }

    public function BusquedaTesis(Request $request){
        $tesis = new TrabajosRecepcionales();
        return $tesis->BusquedaTesis($request);
    }

    public function EliminarTesis(Request $request){
        $tesis = new TrabajosRecepcionales();
        return $tesis->EliminarTesis($request);
    }

    public function ValidarDatosGeneralesTesis(Request $request){
        $validator = Validator::make($request->all(), [
                'Autor'=>'required|string',
                'IdAutor'=>'required',
                'Estado'  => 'required',
                'Titulo' => 'required|string|max:100',
                'DireccionRepositorio' => 'required_if:Estado,==,Publicado|max:250|url|nullable',
                'DireccionDocumento' => 'required_if:Estado,==,Publicado|max:250|url|nullable',
                'ArchivoTesis' => 'required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
                'ArchivoActaDeExamen' => 'required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
                'MesPublicacion' => 'required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
                'AnioPublicacion' => 'required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',

                'Director' => 'required|different:Codirector|different:JuradoP|different:JuradoS|different:JuradoV',
                'Codirector' => 'nullable|different:Director|different:JuradoP|different:JuradoS|different:JuradoV|exclude_if:Estado,==,EnProceso|required_with:ArchivoEvCodirector',
                'JuradoP' => 'exclude_if:Estado,==,EnProceso|required_if:Estado,==,Presentado|required_if:Estado,==,Publicado|different:Codirector|different:Director|different:JuradoS|different:JuradoV',
                'JuradoS' => 'exclude_if:Estado,==,EnProceso|required_if:Estado,==,Presentado|required_if:Estado,==,Publicado|different:Codirector|different:JuradoP|different:Director|different:JuradoV',
                'JuradoV' => 'exclude_if:Estado,==,EnProceso|required_if:Estado,==,Presentado|required_if:Estado,==,Publicado|different:Codirector|different:JuradoP|different:JuradoS|different:Director',

                'IdDirector' => 'required',
                'IdCodirector' => 'required_with:Codirector',
                'IdJuradoP' => 'required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
                'IdJuradoS' => 'required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
                'IdJuradoV' => 'required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
                
                'ArchivoEvJuradoP' => 'required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
                'ArchivoEvJuradoS' => 'required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
                'ArchivoEvJuradoV' => 'required_if:Estado,==,Presentado|required_if:Estado,==,Publicado'

            ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function ValidarDatosGeneralesTesisModificar(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'Autor'=>'required|string',
            'IdAutor'=>'required',
            'Estado'  => 'required',
            'Titulo' => 'required|string|max:100',
            'DireccionRepositorio' => 'required_if:Estado,==,Publicado|max:250|url|nullable',
            'DireccionDocumento' => 'required_if:Estado,==,Publicado|max:250|url|nullable',
            'ArchivoTesis' => 'exclude_if:EstadoPrevio,==,Presentado|exclude_if:EstadoPrevio,==,Publicado|required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
            'ArchivoActaDeExamen' => 'exclude_if:EstadoPrevio,==,Presentado|exclude_if:EstadoPrevio,==,Publicado|required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
            'MesPublicacion' => 'required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
            'AnioPublicacion' => 'required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
            
            'Director' => 'required|different:Codirector|different:JuradoP|different:JuradoS|different:JuradoV',
            'Codirector' => 'nullable|different:Director|different:JuradoP|different:JuradoS|different:JuradoV|exclude_if:Estado,==,EnProceso|required_with:ArchivoEvCodirector',
            'JuradoP' => 'exclude_if:Estado,==,EnProceso|required_if:Estado,==,Presentado|required_if:Estado,==,Publicado|different:Codirector|different:Director|different:JuradoS|different:JuradoV',
            'JuradoS' => 'exclude_if:Estado,==,EnProceso|required_if:Estado,==,Presentado|required_if:Estado,==,Publicado|different:Codirector|different:JuradoP|different:Director|different:JuradoV',
            'JuradoV' => 'exclude_if:Estado,==,EnProceso|required_if:Estado,==,Presentado|required_if:Estado,==,Publicado|different:Codirector|different:JuradoP|different:JuradoS|different:Director',

            'IdDirector' => 'required',
            'IdCodirector' => 'required_with:Codirector',
            'IdJuradoP' => 'required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
            'IdJuradoS' => 'required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
            'IdJuradoV' => 'required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',

            'ArchivoEvJuradoP' => 'exclude_if:EstadoPrevio,==,Presentado|exclude_if:EstadoPrevio,==,Publicado|required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
            'ArchivoEvJuradoS' => 'exclude_if:EstadoPrevio,==,Presentado|exclude_if:EstadoPrevio,==,Publicado|required_if:Estado,==,Presentado|required_if:Estado,==,Publicado',
            'ArchivoEvJuradoV' => 'exclude_if:EstadoPrevio,==,Presentado|exclude_if:EstadoPrevio,==,Publicado|required_if:Estado,==,Presentado|required_if:Estado,==,Publicado'
        ]);
        if($validator->fails()){
            return $validator->errors();
        }else{
            return true;
        }
    }

    public function obtenerInformacionTesis(Request $request){
        $DatosGenerales = new TrabajosRecepcionales();
        $DatosGenerales = $DatosGenerales -> ObtenerDatosGeneralesTesis($request);
        $Colaboraciones = new Evaluadores();
        $Colaboraciones = $Colaboraciones -> ObtenerEvaluadores($request);

        $array[0] = array(
            "DatosGenerales" => $DatosGenerales,
            "Colaboraciones" => $Colaboraciones
        );
        return $array;
    }

    

    public function RegistrarDG(Request $request){

        $genAnio = new Generaciones();
        $genAnio=$genAnio->getAnioGen($request->get('IdGeneracion'));

        $DatosGenerales = new TrabajosRecepcionales();
        $idTesis=$DatosGenerales->RegistrarDG($request, $genAnio);

        $Evaluadores = new Evaluadores();
        $Evaluadores->RegistrarEvaluadores($request, $idTesis);
        

        return "hecho";
    }

    public function ModificarDG(Request $request, $id){
        $genAnio = new Generaciones();
        $genAnio=$genAnio->getAnioGen($request->get('IdGeneracion'));

        $DatosGenerales = new TrabajosRecepcionales();
        $DatosGenerales->ModificarDG($request, $genAnio, $id);

        $Evaluadores = new Evaluadores();
        $Evaluadores->ModificarEvaluadores($request, $id);

        return "hecho";
    }
}
