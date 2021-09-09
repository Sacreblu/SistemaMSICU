<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Evaluadores extends Model
{
    protected $fillable = [
        'id',
        'Id_Tesis',
        'Director',
        'Ruta_Ev_Director',
        'Nombre_Ev_Director',
        'Codirector',
        'Ruta_Ev_Codirector',
        'Nombre_Ev_Codirector',
        'JuradoP',
        'Ruta_Ev_JuradoP',
        'Nombre_Ev_JuradoP',
        'JuradoS',
        'Ruta_Ev_JuradoS',
        'Nombre_Ev_JuradoS',
        'JuradoV',
        'Ruta_Ev_JuradoV',
        'Nombre_Ev_JuradoV',
    ];

    public function ModificarEvaluadores($request, $idTesis){
        $estado = $request->get('Estado');

        $evaluaciones = Evaluadores::where('Id_Tesis', '=', $idTesis)->first();

        $evaluaciones->Director = $request->get('IdDirector');
        $evaluaciones->Codirector = $request->get('IdCodirector');

        if($estado!="EnProceso"){
            try {
                mkdir(public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $inicialesAutor="";
            $aux=explode(" ", $request->get('Autor'));
            for ($i=0; $i < count($aux) ; $i++) { 
                $inicialesAutor = $inicialesAutor . substr($aux[$i], 0, 1);
            }

            if($request->file('ArchivoEvDirector')!=null){
                
                try {
                    $file = glob(public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$request->get('NombreArchivoEvDirector')); //obtenemos todos los nombres de los ficheros
                    unlink($file[0]);
                } catch (\Throwable $th) {
                    //throw $th;
                }

                $archivoDirector = $request->file('ArchivoEvDirector');
                $NombreEvDirector="";
                $RutaEvDirector="";
    
                $inicialesDirector="";
                $aux2=explode(" ", $request->get('Director'));
                for ($i=0; $i < count($aux2) ; $i++) { 
                    $inicialesDirector = $inicialesDirector . substr($aux2[$i], 0, 1);
                }
                
                $extension = $archivoDirector->getClientOriginalExtension();
                $NombreEvDirector = "Evaluación_De_Tesis-Director-".$inicialesDirector."-Est-".$inicialesAutor.".".$extension;
                $tmpPath = $archivoDirector;
                $newPath = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvDirector;
                move_uploaded_file($tmpPath,$newPath);

                $RutaEvDirector = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvDirector;

                $evaluaciones->Ruta_Ev_Director = $RutaEvDirector;
                $evaluaciones->Nombre_Ev_Director = $NombreEvDirector;
            }else{

                $NombreEvDirector="";
                $RutaEvDirector="";
                if ($evaluaciones->Ruta_Ev_Director!=null) {
                    try {
                        $inicialesDirector="";
                        $aux2=explode(" ", $request->get('Director'));
                        for ($i=0; $i < count($aux2) ; $i++) { 
                            $inicialesDirector = $inicialesDirector . substr($aux2[$i], 0, 1);
                        }
                        
                        $extension = "pdf";
                        $NombreEvDirector = "Evaluación_De_Tesis-Director-".$inicialesDirector."-Est-".$inicialesAutor.".".$extension;
                        $newPath = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvDirector;
                        rename(public_path().$evaluaciones->Ruta_Ev_Director,$newPath);
    
                        $RutaEvDirector = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvDirector;
    
                        $evaluaciones->Ruta_Ev_Director = $RutaEvDirector;
                        $evaluaciones->Nombre_Ev_Director = $NombreEvDirector;
                    } catch (\Throwable $th) {
                        //throw $th;
                    }
                }
                
            }

            if($request->file('ArchivoEvCodirector')!=null && $request->get('IdCodirector')!=null){
                
                try {
                    $file = glob(public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$request->get('NombreArchivoEvCodirector')); //obtenemos todos los nombres de los ficheros
                    unlink($file[0]);
                } catch (\Throwable $th) {
                    //throw $th;
                }

                $archivoCodirector = $request->file('ArchivoEvCodirector');
                $NombreEvCodirector="";
                $RutaEvCodirector="";
    
                $inicialesCodirector="";
                $aux3=explode(" ", $request->get('Codirector'));
                for ($i=0; $i < count($aux3) ; $i++) { 
                    $inicialesCodirector = $inicialesCodirector . substr($aux3[$i], 0, 1);
                }

                $extension2 = $archivoCodirector->getClientOriginalExtension();
                $NombreEvCodirector = "Evaluación_De_Tesis-Codirector-".$inicialesCodirector."-Est-".$inicialesAutor.".".$extension2;
                $tmpPath2 = $archivoCodirector;
                $newPath2 = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvCodirector;
                move_uploaded_file($tmpPath2,$newPath2);

                $RutaEvCodirector = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvCodirector;

                $evaluaciones->Ruta_Ev_Codirector = $NombreEvCodirector;
                $evaluaciones->Nombre_Ev_Codirector = $RutaEvCodirector;
            }else{
                $NombreEvCodirector="";
                $RutaEvCodirector="";
                if ($evaluaciones->Ruta_Ev_Codirector!=null) {
                    try {
                        $inicialesCodirector="";
                        $aux3=explode(" ", $request->get('Codirector'));
                        for ($i=0; $i < count($aux3) ; $i++) { 
                            $inicialesCodirector = $inicialesCodirector . substr($aux3[$i], 0, 1);
                        }
                        
                        $extension2 = "pdf";
                        $NombreEvCodirector = "Evaluación_De_Tesis-Codirector-".$inicialesCodirector."-Est-".$inicialesAutor.".".$extension2;
                        $newPath2 = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvCodirector;
                        rename(public_path().$evaluaciones->Ruta_Ev_Codirector,$newPath2);
    
                        $RutaEvCodirector = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvCodirector;
    
                        $evaluaciones->Ruta_Ev_Codirector = $NombreEvCodirector;
                        $evaluaciones->Nombre_Ev_Codirector = $RutaEvCodirector;
                    } catch (\Throwable $th) {
                        //throw $th;
                    }
                }
                
            }

            if($request->file('ArchivoEvJuradoP')!=null){
                
                try {
                    $file = glob(public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$request->get('NombreArchivoEvJuradoP')); //obtenemos todos los nombres de los ficheros
                    unlink($file[0]);
                } catch (\Throwable $th) {
                    //throw $th;
                }

                $archivoJuradoP = $request->file('ArchivoEvJuradoP');
                $NombreEvJuradoP="";
                $RutaEvJuradoP="";

                $inicialesJuradoP="";
                $aux3=explode(" ", $request->get('JuradoP'));
                for ($i=0; $i < count($aux3) ; $i++) { 
                    $inicialesJuradoP = $inicialesJuradoP . substr($aux3[$i], 0, 1);
                }
                
                $extension3 = $archivoJuradoP->getClientOriginalExtension();
                $NombreEvJuradoP = "Evaluación_De_Tesis-JuradoP-".$inicialesJuradoP."-Est-".$inicialesAutor.".".$extension3;
                $tmpPath3 = $archivoJuradoP;
                $newPath3 = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoP;
                move_uploaded_file($tmpPath3,$newPath3);
    
                $RutaEvJuradoP = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoP;

                $evaluaciones->Ruta_Ev_JuradoP = $RutaEvJuradoP;
                $evaluaciones->Nombre_Ev_JuradoP = $NombreEvJuradoP;
            }else{
                $NombreEvJuradoP="";
                $RutaEvJuradoP="";
    
                if ($evaluaciones->Ruta_Ev_JuradoP!=null) {
                    try {
                        $inicialesJuradoP="";
                        $aux3=explode(" ", $request->get('JuradoP'));
                        for ($i=0; $i < count($aux3) ; $i++) { 
                            $inicialesJuradoP = $inicialesJuradoP . substr($aux3[$i], 0, 1);
                        }
                        
                        $extension = "pdf";
                        $NombreEvJuradoP = "Evaluación_De_Tesis-JuradoP-".$inicialesJuradoP."-Est-".$inicialesAutor.".".$extension3;
                        $newPath3 = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoP;
                        rename(public_path().$evaluaciones->Ruta_Ev_JuradoP,$newPath3);
    
                        $RutaEvJuradoP = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoP;
    
                        $evaluaciones->Ruta_Ev_JuradoP = $RutaEvJuradoP;
                        $evaluaciones->Nombre_Ev_JuradoP = $NombreEvJuradoP;
                    } catch (\Throwable $th) {
                        //throw $th;
                    }
                }
                
            }

            if($request->file('ArchivoEvJuradoS')!=null){
                
                try {
                    $file = glob(public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$request->get('NombreArchivoEvJuradoS')); //obtenemos todos los nombres de los ficheros
                    unlink($file[0]);
                } catch (\Throwable $th) {
                    //throw $th;
                }

                $archivoJuradoS = $request->file('ArchivoEvJuradoS');
                $NombreEvJuradoS="";
                $RutaEvJuradoS="";

                $inicialesJuradoS="";
                $aux4=explode(" ", $request->get('JuradoS'));
                for ($i=0; $i < count($aux4) ; $i++) { 
                    $inicialesJuradoS = $inicialesJuradoS . substr($aux4[$i], 0, 1);
                }

                $extension4 = $archivoJuradoS->getClientOriginalExtension();
                $NombreEvJuradoS = "Evaluación_De_Tesis-JuradoS-".$inicialesJuradoS."-Est-".$inicialesAutor.".".$extension4;
                $tmpPath4 = $archivoJuradoS;
                $newPath4 = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoS;
                move_uploaded_file($tmpPath4,$newPath4);

                $RutaEvJuradoS = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoS;

                $evaluaciones->Ruta_Ev_JuradoS = $RutaEvJuradoS;
                $evaluaciones->Nombre_Ev_JuradoS = $NombreEvJuradoS;
            }else{
                $NombreEvJuradoS="";
                $RutaEvJuradoS="";

                if ($evaluaciones->Ruta_Ev_JuradoS!=null) {
                    try {
                        $inicialesJuradoS="";
                        $aux4=explode(" ", $request->get('JuradoS'));
                        for ($i=0; $i < count($aux4) ; $i++) { 
                            $inicialesJuradoS = $inicialesJuradoS . substr($aux4[$i], 0, 1);
                        }
                        
                        $extension = "pdf";
                        $NombreEvJuradoS = "Evaluación_De_Tesis-JuradoS-".$inicialesJuradoS."-Est-".$inicialesAutor.".".$extension4;
                        $newPath4 = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoS;
                        rename(public_path().$evaluaciones->Ruta_Ev_JuradoS,$newPath3);

                        $RutaEvJuradoS = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoS;

                        $evaluaciones->Ruta_Ev_JuradoP = $RutaEvJuradoS;
                        $evaluaciones->Nombre_Ev_JuradoP = $NombreEvJuradoS;
                    } catch (\Throwable $th) {
                        //throw $th;
                    }
                }
            }
            
            if($request->file('ArchivoEvJuradoV')!=null){
                try {
                    $file = glob(public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$request->get('NombreArchivoEvJuradoV')); //obtenemos todos los nombres de los ficheros
                    unlink($file[0]);
                } catch (\Throwable $th) {
                    //throw $th;
                }
                $archivoJuradoV = $request->file('ArchivoEvJuradoV');
                $NombreEvJuradoV="";
                $RutaEvJuradoV="";

                $inicialesJuradoV="";
                $aux5=explode(" ", $request->get('JuradoV'));
                for ($i=0; $i < count($aux5) ; $i++) { 
                    $inicialesJuradoV = $inicialesJuradoV . substr($aux5[$i], 0, 1);
                }

                $extension5 = $archivoJuradoV->getClientOriginalExtension();
                $NombreEvJuradoV = "Evaluación_De_Tesis-JuradoV-".$inicialesJuradoV."-Est-".$inicialesAutor.".".$extension5;
                $tmpPath5 = $archivoJuradoV;
                $newPath5 = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoV;
                move_uploaded_file($tmpPath5,$newPath5);

                $RutaEvJuradoV = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoV;

                $evaluaciones->Ruta_Ev_JuradoV = $RutaEvJuradoV;
                $evaluaciones->Nombre_Ev_JuradoV = $NombreEvJuradoV;
            }else{
                $NombreEvJuradoV="";
                $RutaEvJuradoV="";

                if ($evaluaciones->Ruta_Ev_JuradoV!=null) {
                    try {
                        $inicialesJuradoV="";
                        $aux5=explode(" ", $request->get('JuradoV'));
                        for ($i=0; $i < count($aux5) ; $i++) { 
                            $inicialesJuradoV = $inicialesJuradoV . substr($aux5[$i], 0, 1);
                        }
                        
                        $extension = "pdf";
                        $NombreEvJuradoV = "Evaluación_De_Tesis-JuradoV-".$inicialesJuradoV."-Est-".$inicialesAutor.".".$extension5;
                        $newPath5 = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoV;
                        rename(public_path().$evaluaciones->Ruta_Ev_JuradoV,$newPath3);

                        $RutaEvJuradoV = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoS;

                        $evaluaciones->Ruta_Ev_JuradoV = $RutaEvJuradoV;
                        $evaluaciones->Nombre_Ev_JuradoV = $NombreEvJuradoV;
                    } catch (\Throwable $th) {
                        //throw $th;
                    }
                }
            }

            $evaluaciones->JuradoP = $request->get('IdJuradoP');
            $evaluaciones->JuradoS = $request->get('IdJuradoS');
            $evaluaciones->JuradoV = $request->get('IdJuradoV');
        }else{
            $evaluaciones->Ruta_Ev_Director = null;
            $evaluaciones->Nombre_Ev_Director = null;
            $evaluaciones->Ruta_Ev_Codirector = null;
            $evaluaciones->Nombre_Ev_Codirector = null;

            $evaluaciones->JuradoP = null;
            $evaluaciones->Ruta_Ev_JuradoP = null;
            $evaluaciones->Nombre_Ev_JuradoP = null;

            $evaluaciones->JuradoS = null;
            $evaluaciones->Ruta_Ev_JuradoS = null;
            $evaluaciones->Nombre_Ev_JuradoS = null;

            $evaluaciones->JuradoV = null;
            $evaluaciones->Ruta_Ev_JuradoV = null;
            $evaluaciones->Nombre_Ev_JuradoV = null;

        }

        $evaluaciones->save();

    }

    public function RegistrarEvaluadores($request, $idTesis){
        
        $datos = new Evaluadores([
            'Id_Tesis'=> $idTesis,
            'Director'=> $request->get('IdDirector'),
            'Codirector'=> $request->get('IdCodirector')
        ]); 
        $datos->save();
        $idRegistro = $datos->id;

        if($request->get('Estado')!="EnProceso"){
            $inicialesAutor="";
            $aux=explode(" ", $request->get('Autor'));
            for ($i=0; $i < count($aux) ; $i++) { 
                $inicialesAutor = $inicialesAutor . substr($aux[$i], 0, 1);
            }

            try {
                mkdir(public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/', 0700);
            } catch (\Throwable $th) {
                //throw $th;
            }

            $NombreEvDirector = '';
            $RutaEvDirector = '';
            if ($request->file('ArchivoEvDirector')!=null) {
                $archivoDirector = $request->file('ArchivoEvDirector');
                $NombreEvDirector="";
                $RutaEvDirector="";

                $inicialesDirector="";
                $aux2=explode(" ", $request->get('Director'));
                for ($i=0; $i < count($aux2) ; $i++) { 
                    $inicialesDirector = $inicialesDirector . substr($aux2[$i], 0, 1);
                }

                $extension = $archivoDirector->getClientOriginalExtension();
                $NombreEvDirector = "Evaluación_De_Tesis-Director-".$inicialesDirector."-Est-".$inicialesAutor.".".$extension;
                $tmpPath = $archivoDirector;
                $newPath = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvDirector;
                move_uploaded_file($tmpPath,$newPath);

                $RutaEvDirector = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvDirector;
            }

            

            
            $NombreEvCodirector="";
            $RutaEvCodirector="";
            if($request->file('ArchivoEvCodirector')!=null && $request->get('IdCodirector')!=null){
                $archivoCodirector = $request->file('ArchivoEvCodirector');
                
                $inicialesCodirector="";
                $aux3=explode(" ", $request->get('Codirector'));
                for ($i=0; $i < count($aux3) ; $i++) { 
                    $inicialesCodirector = $inicialesCodirector . substr($aux3[$i], 0, 1);
                }

                $extension2 = $archivoCodirector->getClientOriginalExtension();
                $NombreEvCodirector = "Evaluación_De_Tesis-Codirector-".$inicialesCodirector."-Est-".$inicialesAutor.".".$extension2;
                $tmpPath2 = $archivoCodirector;
                $newPath2 = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvCodirector;
                move_uploaded_file($tmpPath2,$newPath2);

                $RutaEvCodirector = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvCodirector;
            }

            $archivoJuradoP = $request->file('ArchivoEvJuradoP');
            $NombreEvJuradoP="";
            $RutaEvJuradoP="";

            $inicialesJuradoP="";
            $aux3=explode(" ", $request->get('JuradoP'));
            for ($i=0; $i < count($aux3) ; $i++) { 
                $inicialesJuradoP = $inicialesJuradoP . substr($aux3[$i], 0, 1);
            }

            $extension3 = $archivoJuradoP->getClientOriginalExtension();
            $NombreEvJuradoP = "Evaluación_De_Tesis-JuradoP-".$inicialesJuradoP."-Est-".$inicialesAutor.".".$extension3;
            $tmpPath3 = $archivoJuradoP;
            $newPath3 = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoP;
            move_uploaded_file($tmpPath3,$newPath3);

            $RutaEvJuradoP = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoP;


            $archivoJuradoS = $request->file('ArchivoEvJuradoS');
            $NombreEvJuradoS="";
            $RutaEvJuradoS="";

            $inicialesJuradoS="";
            $aux4=explode(" ", $request->get('JuradoS'));
            for ($i=0; $i < count($aux4) ; $i++) { 
                $inicialesJuradoS = $inicialesJuradoS . substr($aux4[$i], 0, 1);
            }

            $extension4 = $archivoJuradoS->getClientOriginalExtension();
            $NombreEvJuradoS = "Evaluación_De_Tesis-JuradoS-".$inicialesJuradoS."-Est-".$inicialesAutor.".".$extension4;
            $tmpPath4 = $archivoJuradoS;
            $newPath4 = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoS;
            move_uploaded_file($tmpPath4,$newPath4);

            $RutaEvJuradoS = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoS;





            $archivoJuradoV = $request->file('ArchivoEvJuradoV');
            $NombreEvJuradoV="";
            $RutaEvJuradoV="";

            $inicialesJuradoV="";
            $aux5=explode(" ", $request->get('JuradoV'));
            for ($i=0; $i < count($aux5) ; $i++) { 
                $inicialesJuradoV = $inicialesJuradoV . substr($aux5[$i], 0, 1);
            }

            $extension5 = $archivoJuradoV->getClientOriginalExtension();
            $NombreEvJuradoV = "Evaluación_De_Tesis-JuradoV-".$inicialesJuradoV."-Est-".$inicialesAutor.".".$extension5;
            $tmpPath5 = $archivoJuradoV;
            $newPath5 = public_path().'/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoV;
            move_uploaded_file($tmpPath5,$newPath5);

            $RutaEvJuradoV = '/storage/Documentos/TrabajosRecepcionales/'.$idTesis.'/Evaluaciones'.'/'.$NombreEvJuradoV;


            $evaluaciones = Evaluadores::find($idRegistro);
            $evaluaciones->Ruta_Ev_Director = $RutaEvDirector;
            $evaluaciones->Nombre_Ev_Director = $NombreEvDirector;
            $evaluaciones->Ruta_Ev_Codirector = $RutaEvCodirector;
            $evaluaciones->Nombre_Ev_Codirector = $NombreEvCodirector;

            $evaluaciones->JuradoP = $request->get('IdJuradoP');
            $evaluaciones->Ruta_Ev_JuradoP = $RutaEvJuradoP;
            $evaluaciones->Nombre_Ev_JuradoP = $NombreEvJuradoP;

            $evaluaciones->JuradoS = $request->get('IdJuradoS');
            $evaluaciones->Ruta_Ev_JuradoS = $RutaEvJuradoS;
            $evaluaciones->Nombre_Ev_JuradoS = $NombreEvJuradoS;

            $evaluaciones->JuradoV = $request->get('IdJuradoV');
            $evaluaciones->Ruta_Ev_JuradoV = $RutaEvJuradoV;
            $evaluaciones->Nombre_Ev_JuradoV = $NombreEvJuradoV;

            $evaluaciones->save();
        }

    }

    

    public function ObtenerEvaluadores($request){
        $idTesis = $request->get('idTesis');
        $evaluaciones = Evaluadores::join('profesores as Director', 'evaluadores.Director', '=', 'Director.id')
                ->leftJoin('profesores as Codirector', 'evaluadores.Codirector', '=', 'Codirector.id')
                ->leftJoin('profesores as JuradoP', 'evaluadores.JuradoP', '=', 'JuradoP.id')
                ->leftJoin('profesores as JuradoS', 'evaluadores.JuradoS', '=', 'JuradoS.id')
                ->leftJoin('profesores as JuradoV', 'evaluadores.JuradoV', '=', 'JuradoV.id')
                ->select('Id_Tesis', 'Director', 'Director.Nombre as NombreDirector', 'Director.Apellido_P as ApellidoPDirector', 'Director.Apellido_M as ApellidoMDirector', 'Ruta_Ev_Director', 'Nombre_Ev_Director',
                        'Codirector', 'Codirector.Nombre as NombreCodirector', 'Codirector.Apellido_P as ApellidoPCodirector', 'Codirector.Apellido_M as ApellidoMCodirector', 'Ruta_Ev_Codirector', 'Nombre_Ev_Codirector',
                        'JuradoP', 'JuradoP.Nombre as NombreJuradoP', 'JuradoP.Apellido_P as ApellidoPJuradoP', 'JuradoP.Apellido_M as ApellidoMJuradoP', 'Ruta_Ev_JuradoP', 'Nombre_Ev_JuradoP',
                        'JuradoS', 'JuradoS.Nombre as NombreJuradoS', 'JuradoS.Apellido_P as ApellidoPJuradoS', 'JuradoS.Apellido_M as ApellidoMJuradoS', 'Ruta_Ev_JuradoS', 'Nombre_Ev_JuradoS',
                        'JuradoV', 'JuradoV.Nombre as NombreJuradoV', 'JuradoV.Apellido_P as ApellidoPJuradoV', 'JuradoV.Apellido_M as ApellidoMJuradoV', 'Ruta_Ev_JuradoV', 'Nombre_Ev_JuradoV')
                ->where('evaluadores.Id_Tesis', '=', $idTesis)->first();
        return $evaluaciones;
    }
}
