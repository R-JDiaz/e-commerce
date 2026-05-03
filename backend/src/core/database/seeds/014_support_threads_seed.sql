INSERT INTO support_threads (
  user_id,
  visitor_key,
  user_name,
  user_email,
  status,
  unread_count,
  messages,
  last_message_at,
  created_at,
  updated_at
)
VALUES
(
  3,
  NULL,
  'John Doe',
  'john.doe@example.com',
  'open',
  1,
  '[
    {
      "id": "st-msg-001",
      "sender": "system",
      "author_name": "Support",
      "body": "Hi! Thanks for reaching out. We will help you with your order, products, or checkout questions.",
      "created_at": "2026-05-01T08:15:00.000Z"
    },
    {
      "id": "st-msg-002",
      "sender": "customer",
      "author_name": "John Doe",
      "body": "My order still shows processing even though it was placed two days ago.",
      "created_at": "2026-05-01T08:18:00.000Z"
    },
    {
      "id": "st-msg-003",
      "sender": "admin",
      "author_name": "Admin Support",
      "body": "Thanks, John. Can you share the order number so I can check it right away?",
      "created_at": "2026-05-01T08:22:00.000Z"
    }
  ]',
  '2026-05-01 08:22:00',
  '2026-05-01 08:15:00',
  '2026-05-01 08:22:00'
),
(
  4,
  NULL,
  'Jane Smith',
  'jane.smith@example.com',
  'closed',
  0,
  '[
    {
      "id": "st-msg-004",
      "sender": "system",
      "author_name": "Support",
      "body": "Hi! Thanks for reaching out. We will help you with your order, products, or checkout questions.",
      "created_at": "2026-04-29T10:05:00.000Z"
    },
    {
      "id": "st-msg-005",
      "sender": "customer",
      "author_name": "Jane Smith",
      "body": "Is the medium size on the hoodie true to fit?",
      "created_at": "2026-04-29T10:08:00.000Z"
    },
    {
      "id": "st-msg-006",
      "sender": "admin",
      "author_name": "Admin Support",
      "body": "Yes, it runs true to size. If you prefer a relaxed fit, you can go one size up.",
      "created_at": "2026-04-29T10:11:00.000Z"
    },
    {
      "id": "st-msg-007",
      "sender": "customer",
      "author_name": "Jane Smith",
      "body": "Perfect, thanks for the quick reply!",
      "created_at": "2026-04-29T10:13:00.000Z"
    }
  ]',
  '2026-04-29 10:13:00',
  '2026-04-29 10:05:00',
  '2026-04-29 10:13:00'
),
(
  6,
  NULL,
  'Ana Garcia',
  'ana.garcia@example.com',
  'open',
  2,
  '[
    {
      "id": "st-msg-008",
      "sender": "system",
      "author_name": "Support",
      "body": "Hi! Thanks for reaching out. We will help you with your order, products, or checkout questions.",
      "created_at": "2026-05-02T14:30:00.000Z"
    },
    {
      "id": "st-msg-009",
      "sender": "customer",
      "author_name": "Ana Garcia",
      "body": "I am having trouble placing my order. The payment step keeps reloading.",
      "created_at": "2026-05-02T14:32:00.000Z"
    }
  ]',
  '2026-05-02 14:32:00',
  '2026-05-02 14:30:00',
  '2026-05-02 14:32:00'
),
(
  NULL,
  'guest-2026-001',
  'Guest',
  NULL,
  'open',
  1,
  '[
    {
      "id": "st-msg-010",
      "sender": "system",
      "author_name": "Support",
      "body": "Hi! Thanks for reaching out. We will help you with your order, products, or checkout questions.",
      "created_at": "2026-05-03T09:10:00.000Z"
    },
    {
      "id": "st-msg-011",
      "sender": "customer",
      "author_name": "Guest",
      "body": "Do you have cash on delivery available in my area?",
      "created_at": "2026-05-03T09:12:00.000Z"
    }
  ]',
  '2026-05-03 09:12:00',
  '2026-05-03 09:10:00',
  '2026-05-03 09:12:00'
),
(
  9,
  NULL,
  'Sarah Lee',
  'sarah.lee@example.com',
  'open',
  3,
  '[
    {
      "id": "st-msg-012",
      "sender": "system",
      "author_name": "Support",
      "body": "Hi! Thanks for reaching out. We will help you with your order, products, or checkout questions.",
      "created_at": "2026-05-04T07:45:00.000Z"
    },
    {
      "id": "st-msg-013",
      "sender": "customer",
      "author_name": "Sarah Lee",
      "body": "I want to return one item from my order but keep the other two.",
      "created_at": "2026-05-04T07:48:00.000Z"
    },
    {
      "id": "st-msg-014",
      "sender": "admin",
      "author_name": "Admin Support",
      "body": "No problem, Sarah. I will check the return options for the item you want to send back.",
      "created_at": "2026-05-04T07:52:00.000Z"
    }
  ]',
  '2026-05-04 07:52:00',
  '2026-05-04 07:45:00',
  '2026-05-04 07:52:00'
);
