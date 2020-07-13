"""empty message

Revision ID: d8e52342770d
Revises: 28ccac0185ff
Create Date: 2020-07-13 07:57:26.915592

"""

# revision identifiers, used by Alembic.
revision = 'd8e52342770d'
down_revision = '28ccac0185ff'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

def upgrade():
    op.create_table(
        'notebooks',
        sa.Column('name', sa.String(length=24), nullable=False),
        sa.Column('color', sa.String(length=6), nullable=False),
        sa.Column('user', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.Integer(), nullable=False),
        sa.Column('updated_at', sa.Integer(), nullable=False)
    )


def downgrade():
    op.drop_table('notebooks')
