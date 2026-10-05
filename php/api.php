<?php
/**
 * Ayuki Sushi - API de comunicación AJAX / JSON
 */
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/config.php';

$action = $_GET['action'] ?? ($_POST['action'] ?? '');

switch ($action) {
    case 'update_status':
        $id = $_POST['id'] ?? '';
        $status = $_POST['status'] ?? '';
        if ($id && in_array($status, ['Confirmed', 'Pending', 'Cancelled'])) {
            updateReservationStatus($id, $status);
            echo json_encode(['success' => true, 'id' => $id, 'status' => $status]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Parámetros inválidos']);
        }
        break;

    case 'add_reservation':
        $name = trim($_POST['name'] ?? '');
        $phone = trim($_POST['phone'] ?? '');
        $email = trim($_POST['email'] ?? ($phone . '@ayuki.guest'));
        $date = $_POST['date'] ?? date('Y-m-d');
        $time = $_POST['time'] ?? '21:00';
        $guests = intval($_POST['guests'] ?? 2);
        $zone = $_POST['zone'] ?? 'Barra Omakase';
        $notes = trim($_POST['notes'] ?? '');

        if ($name && $phone) {
            $newId = 'RES-' . rand(1000, 9999);
            $res = [
                'id' => $newId,
                'date' => $date,
                'time' => $time,
                'name' => $name,
                'phone' => $phone,
                'email' => $email,
                'guests' => $guests,
                'zone' => $zone,
                'status' => 'Pending',
                'notes' => $notes
            ];
            addReservation($res);
            echo json_encode(['success' => true, 'id' => $newId, 'reservation' => $res]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Faltan campos obligatorios']);
        }
        break;

    case 'get_reservations':
        echo json_encode(['success' => true, 'reservations' => getReservations()]);
        break;

    default:
        echo json_encode(['success' => false, 'error' => 'Acción no reconocida']);
        break;
}
