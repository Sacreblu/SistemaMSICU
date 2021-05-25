<?php

namespace App\Http\Controllers;

use App\TiposContrataciones;
use App\TiposColaboraciones;
use App\Paises;
use App\LGAC;
use App\GradosAcademicos;
use App\DocumentosSuperacion;
use App\TiposTrayectorias;
use App\PlanEstudios;


use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuxiliarController extends Controller
{
    public function TipoContrataciones(){
        $tipos = new TiposContrataciones();
        return $tipos->TipoContrataciones();
    }

    public function TipoColaboraciones(){
        $tipos = new TiposColaboraciones();
        return $tipos->TipoColaboraciones();
    }

    public function LGACS(){
        $lgacs = new LGAC();
        return $lgacs->LGACS();
    }

    public function Paises(){
        $paises = new Paises();
        return $paises->Paises();
    }

    public function Grados(){
        $grados = new GradosAcademicos();
        return $grados->Grados();
    }
    
    public function TipoSuperacion(Request $request){
        $tipos = new DocumentosSuperacion();
        return $tipos->Tipos();
    }

    public function TipoTrayectoria(Request $request){
        $tipos = new TiposTrayectorias();
        return $tipos->Tipos();
    }

    public function LGACsByPlan(){
        $planes = new PlanEstudios();
        $planes = $planes->ObtenerPlanes();
        $arrayPlanes = [];
        $arrayLGACs = [];
        for($i=0; $i<count($planes); $i++){
            $lgacs = new LGAC();
            $lgacs = $lgacs->LGACsByPlan($planes[$i]->id);
            $array = array(
                "id" => $planes[$i]->id,
                "Nombre" => $planes[$i]->Nombre,
                "LGACs" => $lgacs
            );
            $arrayPlanes[$i] = $array;
        }
        return $arrayPlanes;
    }

    public function CartasNAB(Request $request){
        $files = glob(public_path().'/storage/tmp/crts/*'); //obtenemos todos los nombres de los ficheros
        foreach($files as $file){
            if(is_file($file))
            unlink($file); //elimino el fichero
        }
        $archivos = $request->file('cartas');
        $arregloRutas = [];
        for ($i=0; $i < count($archivos); $i++) {
            $nombreOriginal = $archivos[$i]->getClientOriginalName();
            $extension = $archivos[$i]->getClientOriginalExtension();
            $fileName = 'Carta'.$i.'.'.$extension;
            $tmpPath = $archivos[$i];
            $newPath = public_path().'/storage/tmp/crts/'.$fileName;
            move_uploaded_file($tmpPath,$newPath);
            $arregloRutas[$i] = ["../storage/tmp/crts/".$fileName, $nombreOriginal];
        }
        return  $arregloRutas;
    }

    public function QuitarCartaNAB(Request $request){
        $id=$request->get('id');
        $file = public_path().'/storage/tmp/crts/Carta'.$id.'.pdf';
        if(is_file($file))
            unlink($file); //elimino el fichero
        return $id;
    }

    public function ArchivosEvidencia(Request $request){
        $archivo = $request->file('ArchivoEvidencia');
        $posicion = $request->get('idPosicion');
        $tipoEvidencia = $request->get('TipoEvidencia');
        $arregloRuta = [];

        $nombreOriginal = $archivo[0]->getClientOriginalName();
        $extension = $archivo[0]->getClientOriginalExtension();
        $fileName = $tipoEvidencia.$posicion.'.'.$extension;
        $tmpPath = $archivo[0];
        $newPath = public_path().'/storage/tmp/'.$fileName;
        move_uploaded_file($tmpPath,$newPath);
        $arregloRuta[0] = ["../storage/tmp/".$fileName, $nombreOriginal];
        return  $arregloRuta;
    }

    public function limpiarTMP(){
        $files = glob(public_path().'/storage/tmp/crts/*.pdf'); //obtenemos todos los nombres de los ficheros
        foreach($files as $file){
            if(is_file($file))
            unlink($file); //elimino el fichero
        }
        $files = glob(public_path().'/storage/tmp/*.pdf'); //obtenemos todos los nombres de los ficheros
        foreach($files as $file){
            if(is_file($file))
            unlink($file); //elimino el fichero
        }
    }
}
