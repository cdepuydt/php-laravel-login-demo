<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'logout']);
    }

    // Override to send json data back to ajax responses
    protected function sendLoginResponse(\Illuminate\Http\Request $request)
    {
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);

        $auth = $this->authenticated($request, $this->guard()->user());
        if (is_null($auth)) {
            if ($request->ajax()) {
                return response()->json([
                    'success' => true
                ]);
            } else {
                return $auth;
            }
        }

        return redirect()->intended($this->redirectPath());
    }

    // Override to send json data back to ajax responses
    protected function sendFailedLoginResponse(\Illuminate\Http\Request $request)
    {
        if ($request->ajax()) {
            return response()->json([
                'success' => false,
                'error' => 'The login data provided does not match our records'
            ]);
        }

        return redirect()->back()
            ->withInput($request->only($this->username(), 'remember'))
            ->withErrors([
                $this->username() => Lang::get('auth.failed'),
            ]);
    }

    // Override to use the user_name column intead of an email
    public function username()
    {
        return 'user_name';
    }
}