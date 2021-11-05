<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProductoslgacController extends Controller
{
    public function registrarProductosLGAC(){
        return view('ProductosLGAC.registrarProductosLGAC');
    }
}
