<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rutina PDF</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1, h2 { color: #333; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
    </style>
</head>
<body>
<h1>Rutina: {{ $routineDetails['routine']['name'] }}</h1>
<p><strong>Descripción:</strong> {{ $routineDetails['routine']['description'] }}</p>
<p><strong>Creado por:</strong> {{ $routineDetails['routine']['user']['name'] }}</p>

<h2>Ejercicios</h2>
@foreach ($routineDetails['exercises'] as $exercise)
    <h3>{{ $exercise['exercise']['name'] }}</h3>
    <p>{{ $exercise['exercise']['description'] }}</p>
    <p><strong>Equipo:</strong> {{ $exercise['exercise']['equipment'] }}</p>

    <table>
        <thead>
        <tr>
            <th>Repeticiones</th>
            <th>RIR</th>
            <th>Fallo</th>
            <th>Peso</th>
        </tr>
        </thead>
        <tbody>
        @foreach ($exercise['series'] as $serie)
            <tr>
                <td>{{ $serie['repetitions'] }}</td>
                <td>{{ $serie['RIR'] }}</td>
                <td>{{ $serie['failure'] ? 'Sí' : 'No' }}</td>
                <td>{{ $serie['weight'] }} kg</td>
            </tr>
        @endforeach
        </tbody>
    </table>
@endforeach
</body>
</html>
