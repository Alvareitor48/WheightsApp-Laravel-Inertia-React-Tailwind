<!DOCTYPE html>
<html>
<head>
    <title>Tu rutina ha sido eliminada</title>
</head>
<body>
<h1>Hola {{ $routine->user->name }},</h1>
<p>Tu rutina "<strong>{{ $routine->name }}</strong>" ha sido eliminada.</p>
<p>Tienes 7 días para recuperarla antes de que se elimine permanentemente.</p>
<p>Puedes restaurarla haciendo clic en el siguiente enlace:</p>
<a href="{{ route('routines.restore', ['id' => $routine->id]) }}">Recuperar Rutina</a>
<p>Si no tomas ninguna acción, la rutina será eliminada definitivamente.</p>
</body>
</html>

